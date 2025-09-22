package com.klinik.repository;

import com.klinik.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    Optional<Doctor> findByEmail(String email);
    
    List<Doctor> findByUzmanlik(String uzmanlik);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT d FROM Doctor d WHERE d.uzmanlik = :uzmanlik ORDER BY d.deneyim DESC")
    List<Doctor> findByUzmanlikOrderByDeneyimDesc(@Param("uzmanlik") String uzmanlik);
    
    @Query("SELECT DISTINCT d.uzmanlik FROM Doctor d ORDER BY d.uzmanlik")
    List<String> findAllDistinctUzmanlik();
}