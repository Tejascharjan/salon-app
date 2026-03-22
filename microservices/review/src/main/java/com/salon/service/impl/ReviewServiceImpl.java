package com.salon.service.impl;

import com.salon.model.Review;
import com.salon.payload.dto.ReviewRequest;
import com.salon.payload.dto.SalonDTO;
import com.salon.payload.dto.UserDTO;
import com.salon.repository.ReviewRepository;
import com.salon.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(ReviewRequest req, UserDTO userDTO, SalonDTO salonDTO) {
        Review review = new Review();
        review.setReviewText(req.getReviewText());
        review.setRating(review.getRating());
        review.setUserId(userDTO.getId());
        review.setSalonId(salonDTO.getId());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsBySalonId(Long salonId) {
        return reviewRepository.findBySalonId(salonId);
    }

    private Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review Not Exists....!"));
    }

    @Override
    public Review updateReview(ReviewRequest req, Long userId, Long reviewId) throws Exception {
        Review review = getReviewById(reviewId);

        if (!review.getUserId().equals(userId)) {
            throw new Exception("you don't have permission to update this review");
        }
        review.setReviewText(req.getReviewText());
        review.setRating(review.getRating());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if (!review.getUserId().equals(userId)) {
            throw new Exception("you don't have permission to update this review");
        }
        reviewRepository.delete(review);
    }
}
