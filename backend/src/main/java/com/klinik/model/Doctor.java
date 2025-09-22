package com.klinik.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Ad boş olamaz")
    @Column(nullable = false)
    private String ad;
    
    @NotBlank(message = "Soyad boş olamaz")
    @Column(nullable = false)
    private String soyad;
    
    @Email(message = "Geçersiz email formatı")
    @NotBlank(message = "Email boş olamaz")
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotBlank(message = "Şifre boş olamaz")
    @JsonIgnore
    @Column(nullable = false)
    private String sifre;
    
    @NotBlank(message = "Uzmanlık alanı boş olamaz")
    @Column(nullable = false)
    private String uzmanlik;
    
    @NotNull(message = "Deneyim yılı boş olamaz")
    @Column(nullable = false)
    private Integer deneyim;
    
    @Column(columnDefinition = "TEXT")
    private String hakkinda;
    
    @Column(name = "calisma_saatleri")
    private String calismaSaatleri;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Ücret 0'dan büyük olmalı")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal ucret;
    
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appointment> appointments;
    
    // Constructors
    public Doctor() {}
    
    public Doctor(String ad, String soyad, String email, String sifre, String uzmanlik, 
                  Integer deneyim, String hakkinda, String calismaSaatleri, BigDecimal ucret) {
        this.ad = ad;
        this.soyad = soyad;
        this.email = email;
        this.sifre = sifre;
        this.uzmanlik = uzmanlik;
        this.deneyim = deneyim;
        this.hakkinda = hakkinda;
        this.calismaSaatleri = calismaSaatleri;
        this.ucret = ucret;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAd() {
        return ad;
    }
    
    public void setAd(String ad) {
        this.ad = ad;
    }
    
    public String getSoyad() {
        return soyad;
    }
    
    public void setSoyad(String soyad) {
        this.soyad = soyad;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSifre() {
        return sifre;
    }
    
    public void setSifre(String sifre) {
        this.sifre = sifre;
    }
    
    public String getUzmanlik() {
        return uzmanlik;
    }
    
    public void setUzmanlik(String uzmanlik) {
        this.uzmanlik = uzmanlik;
    }
    
    public Integer getDeneyim() {
        return deneyim;
    }
    
    public void setDeneyim(Integer deneyim) {
        this.deneyim = deneyim;
    }
    
    public String getHakkinda() {
        return hakkinda;
    }
    
    public void setHakkinda(String hakkinda) {
        this.hakkinda = hakkinda;
    }
    
    public String getCalismaSaatleri() {
        return calismaSaatleri;
    }
    
    public void setCalismaSaatleri(String calismaSaatleri) {
        this.calismaSaatleri = calismaSaatleri;
    }
    
    public BigDecimal getUcret() {
        return ucret;
    }
    
    public void setUcret(BigDecimal ucret) {
        this.ucret = ucret;
    }
    
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    
    public List<Appointment> getAppointments() {
        return appointments;
    }
    
    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
    
    // Helper methods
    public String getFullName() {
        return ad + " " + soyad;
    }
}