package com.klinik.repository;

import com.klinik.model.Appointment;
import com.klinik.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByDoctor(Doctor doctor);
    
    List<Appointment> findByTcAndHastaAdAndHastaSoyad(String tc, String hastaAd, String hastaSoyad);
    
    List<Appointment> findByTarihAndDoctor(LocalDate tarih, Doctor doctor);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor = :doctor AND a.tarih = :tarih AND a.saat = :saat")
    List<Appointment> findByDoctorAndTarihAndSaat(@Param("doctor") Doctor doctor, 
                                                 @Param("tarih") LocalDate tarih, 
                                                 @Param("saat") LocalTime saat);
    
    @Query("SELECT a FROM Appointment a WHERE a.tarih >= :startDate AND a.tarih <= :endDate")
    List<Appointment> findByTarihBetween(@Param("startDate") LocalDate startDate, 
                                        @Param("endDate") LocalDate endDate);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor = :doctor AND a.tarih >= :startDate AND a.tarih <= :endDate")
    List<Appointment> findByDoctorAndTarihBetween(@Param("doctor") Doctor doctor,
                                                 @Param("startDate") LocalDate startDate, 
                                                 @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor = :doctor AND a.tarih = :tarih")
    Long countByDoctorAndTarih(@Param("doctor") Doctor doctor, @Param("tarih") LocalDate tarih);
}