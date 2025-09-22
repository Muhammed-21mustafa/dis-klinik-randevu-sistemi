package com.klinik.service;

import com.klinik.model.Invoice;
import com.klinik.model.Appointment;
import com.klinik.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public Optional<Invoice> getInvoiceByAppointment(Appointment appointment) {
        return invoiceRepository.findByAppointment(appointment);
    }

    public List<Invoice> getInvoicesByDoctor(Long doctorId) {
        return invoiceRepository.findByAppointmentDoctor_Id(doctorId);
    }

    public List<Invoice> getInvoicesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return invoiceRepository.findByTarihBetween(startDate, endDate);
    }

    public List<Invoice> getDoctorInvoicesByDateRange(Long doctorId, LocalDateTime startDate, LocalDateTime endDate) {
        return invoiceRepository.findByDoctorAndTarihBetween(doctorId, startDate, endDate);
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice invoiceDetails) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı: " + id));

        invoice.setTutar(invoiceDetails.getTutar());
        invoice.setAciklama(invoiceDetails.getAciklama());
        invoice.setStatus(invoiceDetails.getStatus());

        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı: " + id));
        invoiceRepository.delete(invoice);
    }

    public BigDecimal getTotalRevenue() {
        BigDecimal total = invoiceRepository.getTotalPaidAmount();
        return total != null ? total : BigDecimal.ZERO;
    }

    public BigDecimal getDoctorRevenue(Long doctorId) {
        BigDecimal total = invoiceRepository.getTotalPaidAmountByDoctor(doctorId);
        return total != null ? total : BigDecimal.ZERO;
    }

    public Invoice markAsPaid(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı: " + id));
        
        invoice.setStatus(Invoice.InvoiceStatus.ODENDI);
        return invoiceRepository.save(invoice);
    }

    public Invoice markAsCancelled(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı: " + id));
        
        invoice.setStatus(Invoice.InvoiceStatus.IPTAL_EDILDI);
        return invoiceRepository.save(invoice);
    }
}