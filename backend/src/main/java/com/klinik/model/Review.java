package com.klinik.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Hasta adı boş olamaz")
    @Column(name = "hasta_ad", nullable = false)
    private String hastaAd;
    
    @NotBlank(message = "Yorum boş olamaz")
    @Size(min = 10, max = 500, message = "Yorum 10-500 karakter arasında olmalı")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String yorum;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private LocalDateTime tarih;
    
    @Column(nullable = false)
    private Integer rating = 5; // 1-5 yıldız
    
    @Column(nullable = false)
    private Boolean approved = false; // Admin onayı
    
    // Constructors
    public Review() {
        this.tarih = LocalDateTime.now();
    }
    
    public Review(String hastaAd, String yorum, Integer rating) {
        this.hastaAd = hastaAd;
        this.yorum = yorum;
        this.rating = rating;
        this.tarih = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getHastaAd() {
        return hastaAd;
    }
    
    public void setHastaAd(String hastaAd) {
        this.hastaAd = hastaAd;
    }
    
    public String getYorum() {
        return yorum;
    }
    
    public void setYorum(String yorum) {
        this.yorum = yorum;
    }
    
    public LocalDateTime getTarih() {
        return tarih;
    }
    
    public void setTarih(LocalDateTime tarih) {
        this.tarih = tarih;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public Boolean getApproved() {
        return approved;
    }
    
    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}