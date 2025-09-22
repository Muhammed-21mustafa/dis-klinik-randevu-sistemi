package com.klinik.security;

import com.klinik.model.Admin;
import com.klinik.model.Doctor;
import com.klinik.repository.AdminRepository;
import com.klinik.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First check if it's an admin
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            
            return User.builder()
                    .username(admin.get().getUsername())
                    .password(admin.get().getPassword())
                    .authorities(authorities)
                    .build();
        }

        // Then check if it's a doctor
        Optional<Doctor> doctor = doctorRepository.findByEmail(username);
        if (doctor.isPresent()) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_DOCTOR"));
            
            return User.builder()
                    .username(doctor.get().getEmail())
                    .password(doctor.get().getSifre())
                    .authorities(authorities)
                    .build();
        }

        throw new UsernameNotFoundException("Kullanıcı bulunamadı: " + username);
    }
}