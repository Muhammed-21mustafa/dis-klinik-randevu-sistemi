package com.klinik.controller;

import com.klinik.model.Doctor;
import com.klinik.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Public endpoints for patient access
    @GetMapping("/public")
    public ResponseEntity<List<Doctor>> getAllDoctorsPublic() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Doctor> getDoctorByIdPublic(@PathVariable Long id) {
        return doctorService.getDoctorById(id)
                .map(doctor -> ResponseEntity.ok().body(doctor))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/public/uzmanlik/{uzmanlik}")
    public ResponseEntity<List<Doctor>> getDoctorsByUzmanlikPublic(@PathVariable String uzmanlik) {
        List<Doctor> doctors = doctorService.getDoctorsByUzmanlik(uzmanlik);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/public/uzmanliklar")
    public ResponseEntity<List<String>> getAllUzmanliklarPublic() {
        List<String> uzmanliklar = doctorService.getAllUzmanliklar();
        return ResponseEntity.ok(uzmanliklar);
    }

    // Protected endpoints for doctors
    @GetMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Doctor> getDoctorProfile(@RequestParam String email) {
        return doctorService.getDoctorByEmail(email)
                .map(doctor -> ResponseEntity.ok().body(doctor))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Doctor> updateDoctorProfile(@PathVariable Long id, @Valid @RequestBody Doctor doctorDetails) {
        try {
            Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDetails);
            return ResponseEntity.ok(updatedDoctor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/change-password")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<String> changePassword(@RequestParam String email,
                                               @RequestParam String oldPassword,
                                               @RequestParam String newPassword) {
        boolean success = doctorService.changePassword(email, oldPassword, newPassword);
        if (success) {
            return ResponseEntity.ok("Şifre başarıyla değiştirildi.");
        } else {
            return ResponseEntity.badRequest().body("Mevcut şifre yanlış.");
        }
    }
}