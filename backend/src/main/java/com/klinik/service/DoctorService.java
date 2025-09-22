package com.klinik.service;

import com.klinik.model.Doctor;
import com.klinik.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> getDoctorByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public List<Doctor> getDoctorsByUzmanlik(String uzmanlik) {
        return doctorRepository.findByUzmanlik(uzmanlik);
    }

    public List<String> getAllUzmanliklar() {
        return doctorRepository.findAllDistinctUzmanlik();
    }

    public Doctor saveDoctor(Doctor doctor) {
        if (doctor.getId() == null) {
            // New doctor - encode password
            doctor.setSifre(passwordEncoder.encode(doctor.getSifre()));
        } else {
            // Existing doctor - only encode if password is being changed
            Optional<Doctor> existingDoctor = doctorRepository.findById(doctor.getId());
            if (existingDoctor.isPresent() && 
                !existingDoctor.get().getSifre().equals(doctor.getSifre())) {
                doctor.setSifre(passwordEncoder.encode(doctor.getSifre()));
            }
        }
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + id));

        doctor.setAd(doctorDetails.getAd());
        doctor.setSoyad(doctorDetails.getSoyad());
        doctor.setEmail(doctorDetails.getEmail());
        doctor.setUzmanlik(doctorDetails.getUzmanlik());
        doctor.setDeneyim(doctorDetails.getDeneyim());
        doctor.setHakkinda(doctorDetails.getHakkinda());
        doctor.setCalismaSaatleri(doctorDetails.getCalismaSaatleri());
        doctor.setUcret(doctorDetails.getUcret());
        doctor.setProfileImageUrl(doctorDetails.getProfileImageUrl());

        // Only update password if it's provided and different
        if (doctorDetails.getSifre() != null && 
            !doctorDetails.getSifre().isEmpty() && 
            !doctor.getSifre().equals(doctorDetails.getSifre())) {
            doctor.setSifre(passwordEncoder.encode(doctorDetails.getSifre()));
        }

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + id));
        doctorRepository.delete(doctor);
    }

    public boolean existsByEmail(String email) {
        return doctorRepository.existsByEmail(email);
    }

    public boolean changePassword(String email, String oldPassword, String newPassword) {
        Optional<Doctor> doctorOpt = doctorRepository.findByEmail(email);
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            if (passwordEncoder.matches(oldPassword, doctor.getSifre())) {
                doctor.setSifre(passwordEncoder.encode(newPassword));
                doctorRepository.save(doctor);
                return true;
            }
        }
        return false;
    }

    public void resetPassword(String email, String newPassword) {
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doktor bulunamadı: " + email));
        doctor.setSifre(passwordEncoder.encode(newPassword));
        doctorRepository.save(doctor);
    }
}