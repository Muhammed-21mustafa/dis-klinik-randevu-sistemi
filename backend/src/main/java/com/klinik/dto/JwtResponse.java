package com.klinik.dto;

public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private String username;
    private String role;
    private Long userId;
    
    public JwtResponse(String accessToken, String username, String role, Long userId) {
        this.token = accessToken;
        this.username = username;
        this.role = role;
        this.userId = userId;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}