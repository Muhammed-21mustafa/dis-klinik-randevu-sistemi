package com.klinik.controller;

import com.klinik.dto.JwtResponse;
import com.klinik.dto.LoginRequest;
import com.klinik.dto.PasswordResetRequest;
import com.klinik.model.Admin;
import com.klinik.model.Doctor;
import com.klinik.security.JwtTokenProvider;
import com.klinik.service.AdminService;
import com.klinik.service.DoctorService;
import com.klinik.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.security.SecureRandom;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            String role = authentication.getAuthorities().iterator().next().getAuthority();
            Long userId = null;
            String username = loginRequest.getUsername();

            if (role.equals("ROLE_ADMIN")) {
                Optional<Admin> admin = adminService.getAdminByUsername(username);
                if (admin.isPresent()) {
                    userId = admin.get().getId();
                }
            } else if (role.equals("ROLE_DOCTOR")) {
                Optional<Doctor> doctor = doctorService.getDoctorByEmail(username);
                if (doctor.isPresent()) {
                    userId = doctor.get().getId();
                    username = doctor.get().getFullName();
                }
            }

            return ResponseEntity.ok(new JwtResponse(jwt, username, role, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Hata: Geçersiz kullanıcı adı veya şifre!");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest resetRequest) {
        try {
            // Check if doctor exists
            Optional<Doctor> doctor = doctorService.getDoctorByEmail(resetRequest.getEmail());
            if (doctor.isPresent()) {
                // Generate new temporary password
                String tempPassword = generateTemporaryPassword();
                
                // Update doctor password
                doctorService.resetPassword(resetRequest.getEmail(), tempPassword);
                
                // Send email with new password
                emailService.sendPasswordResetEmail(resetRequest.getEmail(), tempPassword);
                
                return ResponseEntity.ok("Yeni şifreniz email adresinize gönderildi.");
            } else {
                return ResponseEntity.badRequest()
                        .body("Bu email adresi ile kayıtlı doktor bulunamadı.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Şifre sıfırlama sırasında bir hata oluştu.");
        }
    }

    private String generateTemporaryPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < 8; i++) {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }
        
        return sb.toString();
    }
}