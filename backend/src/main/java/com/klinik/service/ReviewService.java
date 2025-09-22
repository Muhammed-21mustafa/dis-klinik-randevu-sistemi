package com.klinik.service;

import com.klinik.model.Review;
import com.klinik.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getApprovedReviews() {
        return reviewRepository.findApprovedOrderByTarihDesc();
    }

    public List<Review> getPendingReviews() {
        return reviewRepository.findByApprovedFalse();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review createReview(Review review) {
        // New reviews are not approved by default
        review.setApproved(false);
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı: " + id));

        review.setHastaAd(reviewDetails.getHastaAd());
        review.setYorum(reviewDetails.getYorum());
        review.setRating(reviewDetails.getRating());
        review.setApproved(reviewDetails.getApproved());

        return reviewRepository.save(review);
    }

    public Review approveReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı: " + id));
        
        review.setApproved(true);
        return reviewRepository.save(review);
    }

    public Review rejectReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı: " + id));
        
        review.setApproved(false);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı: " + id));
        reviewRepository.delete(review);
    }

    public Double getAverageRating() {
        Double average = reviewRepository.getAverageRating();
        return average != null ? average : 0.0;
    }
}