package com.salon.messaging;

import com.salon.dto.PaymentOrder;
import com.salon.model.Booking;
import com.salon.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingEventConsumer {

    private final BookingService bookingService;

    @RabbitListener(queues = "booking-queue")
    public void bookingUpdateListner(PaymentOrder paymentOrder) throws Exception {
        bookingService.bookingSuccess(paymentOrder);
    }

}
