package com.klinik.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Hasta adı boş olamaz")
    @Column(name = "hasta_ad", nullable = false)
    private String hastaAd;
    
    @NotBlank(message = "Hasta soyadı boş olamaz")
    @Column(name = "hasta_soyad", nullable = false)
    private String hastaSoyad;
    
    @NotBlank(message = "TC kimlik numarası boş olamaz")
    @Pattern(regexp = "\\d{11}", message = "TC kimlik numarası 11 haneli olmalı")
    @Column(nullable = false, length = 11)
    private String tc;
    
    @NotBlank(message = "Telefon numarası boş olamaz")
    @Pattern(regexp = "\\d{10,11}", message = "Geçersiz telefon numarası")
    @Column(nullable = false)
    private String telefon;
    
    @NotNull(message = "Doktor seçilmeli")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doktor_id", nullable = false)
    private Doctor doctor;
    
    @NotNull(message = "Tarih seçilmeli")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate tarih;
    
    @NotNull(message = "Saat seçilmeli")
    @JsonFormat(pattern = "HH:mm")
    @Column(nullable = false)
    private LocalTime saat;
    
    @NotBlank(message = "Bölüm boş olamaz")
    @Column(nullable = false)
    private String bolum;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.BEKLEMEDE;
    
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Invoice invoice;
    
    // Constructors
    public Appointment() {}
    
    public Appointment(String hastaAd, String hastaSoyad, String tc, String telefon,
                      Doctor doctor, LocalDate tarih, LocalTime saat, String bolum) {
        this.hastaAd = hastaAd;
        this.hastaSoyad = hastaSoyad;
        this.tc = tc;
        this.telefon = telefon;
        this.doctor = doctor;
        this.tarih = tarih;
        this.saat = saat;
        this.bolum = bolum;
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
    
    public String getHastaSoyad() {
        return hastaSoyad;
    }
    
    public void setHastaSoyad(String hastaSoyad) {
        this.hastaSoyad = hastaSoyad;
    }
    
    public String getTc() {
        return tc;
    }
    
    public void setTc(String tc) {
        this.tc = tc;
    }
    
    public String getTelefon() {
        return telefon;
    }
    
    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
    
    public Doctor getDoctor() {
        return doctor;
    }
    
    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
    
    public LocalDate getTarih() {
        return tarih;
    }
    
    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }
    
    public LocalTime getSaat() {
        return saat;
    }
    
    public void setSaat(LocalTime saat) {
        this.saat = saat;
    }
    
    public String getBolum() {
        return bolum;
    }
    
    public void setBolum(String bolum) {
        this.bolum = bolum;
    }
    
    public AppointmentStatus getStatus() {
        return status;
    }
    
    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }
    
    public Invoice getInvoice() {
        return invoice;
    }
    
    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    
    // Helper methods
    public String getHastaFullName() {
        return hastaAd + " " + hastaSoyad;
    }
    
    public enum AppointmentStatus {
        BEKLEMEDE, ONAYLANDI, TAMAMLANDI, IPTAL_EDILDI
    }
}