package com.klinik.repository;

import com.klinik.model.Invoice;
import com.klinik.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    
    Optional<Invoice> findByAppointment(Appointment appointment);
    
    List<Invoice> findByAppointmentDoctor_Id(Long doctorId);
    
    @Query("SELECT i FROM Invoice i WHERE i.tarih >= :startDate AND i.tarih <= :endDate")
    List<Invoice> findByTarihBetween(@Param("startDate") LocalDateTime startDate, 
                                    @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(i.tutar) FROM Invoice i WHERE i.status = 'ODENDI'")
    BigDecimal getTotalPaidAmount();
    
    @Query("SELECT SUM(i.tutar) FROM Invoice i WHERE i.appointment.doctor.id = :doctorId AND i.status = 'ODENDI'")
    BigDecimal getTotalPaidAmountByDoctor(@Param("doctorId") Long doctorId);
    
    @Query("SELECT i FROM Invoice i WHERE i.appointment.doctor.id = :doctorId AND i.tarih >= :startDate AND i.tarih <= :endDate")
    List<Invoice> findByDoctorAndTarihBetween(@Param("doctorId") Long doctorId,
                                             @Param("startDate") LocalDateTime startDate, 
                                             @Param("endDate") LocalDateTime endDate);
}