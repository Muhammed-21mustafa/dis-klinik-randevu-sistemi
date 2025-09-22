package com.klinik.controller;

import com.klinik.model.*;
import com.klinik.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private ReviewService reviewService;

    // Doctor Management
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @PostMapping("/doctors")
    public ResponseEntity<?> createDoctor(@Valid @RequestBody Doctor doctor) {
        try {
            if (doctorService.existsByEmail(doctor.getEmail())) {
                return ResponseEntity.badRequest().body("Bu email adresi zaten kayıtlı.");
            }
            Doctor savedDoctor = doctorService.saveDoctor(doctor);
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Doktor oluşturulurken hata oluştu: " + e.getMessage());
        }
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Appointment Management
    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(appointment -> ResponseEntity.ok().body(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    // Invoice Management
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/invoices/revenue")
    public ResponseEntity<BigDecimal> getTotalRevenue() {
        BigDecimal revenue = invoiceService.getTotalRevenue();
        return ResponseEntity.ok(revenue);
    }

    @PutMapping("/invoices/{id}/mark-paid")
    public ResponseEntity<Invoice> markInvoiceAsPaid(@PathVariable Long id) {
        try {
            Invoice invoice = invoiceService.markAsPaid(id);
            return ResponseEntity.ok(invoice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Review Management
    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/reviews/pending")
    public ResponseEntity<List<Review>> getPendingReviews() {
        List<Review> reviews = reviewService.getPendingReviews();
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/reviews/{id}/approve")
    public ResponseEntity<Review> approveReview(@PathVariable Long id) {
        try {
            Review review = reviewService.approveReview(id);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/reviews/{id}/reject")
    public ResponseEntity<Review> rejectReview(@PathVariable Long id) {
        try {
            Review review = reviewService.rejectReview(id);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Admin Management
    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@Valid @RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.createAdmin(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Statistics
    @GetMapping("/statistics/summary")
    public ResponseEntity<?> getStatisticsSummary() {
        try {
            long totalDoctors = doctorService.getAllDoctors().size();
            long totalAppointments = appointmentService.getAllAppointments().size();
            long totalInvoices = invoiceService.getAllInvoices().size();
            BigDecimal totalRevenue = invoiceService.getTotalRevenue();
            double averageRating = reviewService.getAverageRating();

            return ResponseEntity.ok(new StatisticsSummary(
                totalDoctors, totalAppointments, totalInvoices, totalRevenue, averageRating
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("İstatistikler alınırken hata oluştu.");
        }
    }

    // Inner class for statistics response
    public static class StatisticsSummary {
        private long totalDoctors;
        private long totalAppointments;
        private long totalInvoices;
        private BigDecimal totalRevenue;
        private double averageRating;

        public StatisticsSummary(long totalDoctors, long totalAppointments, long totalInvoices, 
                               BigDecimal totalRevenue, double averageRating) {
            this.totalDoctors = totalDoctors;
            this.totalAppointments = totalAppointments;
            this.totalInvoices = totalInvoices;
            this.totalRevenue = totalRevenue;
            this.averageRating = averageRating;
        }

        // Getters
        public long getTotalDoctors() { return totalDoctors; }
        public long getTotalAppointments() { return totalAppointments; }
        public long getTotalInvoices() { return totalInvoices; }
        public BigDecimal getTotalRevenue() { return totalRevenue; }
        public double getAverageRating() { return averageRating; }
    }
}