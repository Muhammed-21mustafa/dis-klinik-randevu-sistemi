package com.klinik.controller;

import com.klinik.model.Review;
import com.klinik.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Public endpoints
    @GetMapping("/public")
    public ResponseEntity<List<Review>> getApprovedReviews() {
        List<Review> reviews = reviewService.getApprovedReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/public/average-rating")
    public ResponseEntity<Double> getAverageRating() {
        Double averageRating = reviewService.getAverageRating();
        return ResponseEntity.ok(averageRating);
    }

    @PostMapping("/public")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review) {
        try {
            Review savedReview = reviewService.createReview(review);
            return ResponseEntity.ok("Yorumunuz onay için gönderildi. Teşekkür ederiz!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Yorum gönderilirken hata oluştu: " + e.getMessage());
        }
    }
}