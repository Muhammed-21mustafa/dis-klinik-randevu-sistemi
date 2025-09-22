package com.klinik.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
public class Invoice {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Randevu bilgisi gerekli")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Tutar 0'dan büyük olmalı")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tutar;
    
    @Column(columnDefinition = "TEXT")
    private String aciklama;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private LocalDateTime tarih;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus status = InvoiceStatus.BEKLEMEDE;
    
    // Constructors
    public Invoice() {
        this.tarih = LocalDateTime.now();
    }
    
    public Invoice(Appointment appointment, BigDecimal tutar, String aciklama) {
        this.appointment = appointment;
        this.tutar = tutar;
        this.aciklama = aciklama;
        this.tarih = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Appointment getAppointment() {
        return appointment;
    }
    
    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
    
    public BigDecimal getTutar() {
        return tutar;
    }
    
    public void setTutar(BigDecimal tutar) {
        this.tutar = tutar;
    }
    
    public String getAciklama() {
        return aciklama;
    }
    
    public void setAciklama(String aciklama) {
        this.aciklama = aciklama;
    }
    
    public LocalDateTime getTarih() {
        return tarih;
    }
    
    public void setTarih(LocalDateTime tarih) {
        this.tarih = tarih;
    }
    
    public InvoiceStatus getStatus() {
        return status;
    }
    
    public void setStatus(InvoiceStatus status) {
        this.status = status;
    }
    
    public enum InvoiceStatus {
        BEKLEMEDE, ODENDI, IPTAL_EDILDI
    }
}