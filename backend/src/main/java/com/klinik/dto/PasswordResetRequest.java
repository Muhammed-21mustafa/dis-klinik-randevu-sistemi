package com.klinik.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class PasswordResetRequest {
    
    @Email(message = "Geçersiz email formatı")
    @NotBlank(message = "Email boş olamaz")
    private String email;
    
    public PasswordResetRequest() {}
    
    public PasswordResetRequest(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}