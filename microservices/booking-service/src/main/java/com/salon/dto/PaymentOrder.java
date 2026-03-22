package com.salon.dto;

import com.salon.domain.PaymentMethod;
import lombok.Data;

@Data
public class PaymentOrder {

    private Long id;

    private Long amount;

    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    private Long userId;

    private Long bookingId;

    private Long salonId;
}
