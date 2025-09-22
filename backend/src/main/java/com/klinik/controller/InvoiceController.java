package com.klinik.controller;

import com.klinik.model.Invoice;
import com.klinik.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/invoices")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Doctor endpoints
    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Invoice>> getDoctorInvoices(@PathVariable Long doctorId) {
        List<Invoice> invoices = invoiceService.getInvoicesByDoctor(doctorId);
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/doctor/{doctorId}/revenue")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<BigDecimal> getDoctorRevenue(@PathVariable Long doctorId) {
        BigDecimal revenue = invoiceService.getDoctorRevenue(doctorId);
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/doctor/{doctorId}/date-range")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Invoice>> getDoctorInvoicesByDateRange(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<Invoice> invoices = invoiceService.getDoctorInvoicesByDateRange(doctorId, startDate, endDate);
        return ResponseEntity.ok(invoices);
    }

    // Admin endpoints
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id)
                .map(invoice -> ResponseEntity.ok().body(invoice))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoiceDetails) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoiceDetails);
            return ResponseEntity.ok(updatedInvoice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteInvoice(@PathVariable Long id) {
        try {
            invoiceService.deleteInvoice(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}