package com.salon.service;

import com.salon.model.Review;
import com.salon.payload.dto.ReviewRequest;
import com.salon.payload.dto.SalonDTO;
import com.salon.payload.dto.UserDTO;

import java.util.List;

public interface ReviewService {

    Review createReview(ReviewRequest req, UserDTO userDTO, SalonDTO salonDTO);

    List<Review> getReviewsBySalonId(Long salonId);

    Review updateReview(ReviewRequest req, Long userId, Long reviewId) throws Exception;

    void  deleteReview(Long reviewId, Long userId) throws Exception;
}
