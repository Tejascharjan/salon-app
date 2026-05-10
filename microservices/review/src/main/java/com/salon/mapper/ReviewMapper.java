package com.salon.mapper;

import com.salon.model.Review;
import com.salon.payload.dto.ReviewDTO;
import com.salon.payload.dto.UserDTO;

public class ReviewMapper {

    public static ReviewDTO toDTO(Review review, UserDTO user) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getId());
        reviewDTO.setReviewText(review.getReviewText());
        reviewDTO.setUser(user);
        reviewDTO.setRating(review.getRating());
        reviewDTO.setCreatedAt(review.getCreatedAt());
        return reviewDTO;
    }
}
