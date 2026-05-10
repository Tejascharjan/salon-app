package com.salon.controller;

import com.salon.mapper.ReviewMapper;
import com.salon.model.Review;
import com.salon.payload.dto.*;
import com.salon.service.ReviewService;
import com.salon.service.client.SalonFeignClient;
import com.salon.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserFeignClient userFeignClient;
    private final SalonFeignClient salonFeignClient;


    @PostMapping("/salon/{salonId}")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req,
                                               @PathVariable Long salonId,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();
        SalonDTO salon = salonFeignClient.getSalonById(salonId).getBody();

        Review review = reviewService.createReview(req, user, salon);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<ReviewDTO>> getReviewBySalonId(@PathVariable Long salonId,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salon = salonFeignClient.getSalonById(salonId).getBody();

        List<Review> reviews = reviewService.getReviewsBySalonId(salon.getId());
        List<ReviewDTO> reviewDTOS = reviews.stream().map(review -> {
            UserDTO user =null;
            try {
                user = userFeignClient.getUserById(review.getUserId()).getBody();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return ReviewMapper.toDTO(review, user);
        }).toList();
        return ResponseEntity.ok(reviewDTOS);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody ReviewRequest req,
                                               @PathVariable Long reviewId,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();
        Review review = reviewService.updateReview(req, user.getId(), reviewId);
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();
        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Review has been deleted");
        return ResponseEntity.ok(apiResponse);
    }
}
