package com.klinik.service;

import com.klinik.model.Admin;
import com.klinik.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Optional<Admin> getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Admin createAdmin(Admin admin) {
        // Check if username already exists
        if (adminRepository.existsByUsername(admin.getUsername())) {
            throw new RuntimeException("Bu kullanıcı adı zaten mevcut: " + admin.getUsername());
        }
        
        // Encode password
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin bulunamadı: " + id));

        admin.setUsername(adminDetails.getUsername());
        
        // Only update password if it's provided and different
        if (adminDetails.getPassword() != null && 
            !adminDetails.getPassword().isEmpty() && 
            !passwordEncoder.matches(adminDetails.getPassword(), admin.getPassword())) {
            admin.setPassword(passwordEncoder.encode(adminDetails.getPassword()));
        }

        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin bulunamadı: " + id));
        adminRepository.delete(admin);
    }

    public boolean existsByUsername(String username) {
        return adminRepository.existsByUsername(username);
    }

    public boolean changePassword(String username, String oldPassword, String newPassword) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (passwordEncoder.matches(oldPassword, admin.getPassword())) {
                admin.setPassword(passwordEncoder.encode(newPassword));
                adminRepository.save(admin);
                return true;
            }
        }
        return false;
    }
}