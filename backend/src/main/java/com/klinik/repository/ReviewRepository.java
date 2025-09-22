package com.klinik.repository;

import com.klinik.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByApprovedTrue();
    
    List<Review> findByApprovedFalse();
    
    @Query("SELECT r FROM Review r WHERE r.approved = true ORDER BY r.tarih DESC")
    List<Review> findApprovedOrderByTarihDesc();
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.approved = true")
    Double getAverageRating();
}