package com.salon.dto;

import com.salon.domain.BookingStatus;
import jakarta.persistence.ElementCollection;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;
}
