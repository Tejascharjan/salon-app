package com.salon.controller;

import com.salon.dto.SalonDTO;
import com.salon.model.Booking;
import com.salon.service.BookingService;
import com.salon.service.client.SalonFeignClient;
import com.salon.service.impl.BookingChartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings/chart")
public class ChartController {
    private final BookingChartServiceImpl bookingChartService;
    private final BookingService bookingService;
    private final SalonFeignClient salonService;


    @GetMapping("/earnings")
    public ResponseEntity<List<Map<String,Object>>> getEarningsChartData(@RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salon = salonService.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingsBySalon(salon.getId());

        List<Map<String, Object>> chartData = bookingChartService.generateEarningsChartData(bookings);
        return ResponseEntity.ok(chartData);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookingsChartData(@RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salon = salonService.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingsBySalon(salon.getId());

        List<Map<String, Object>> charData = bookingChartService.generateBookingCountChartData(bookings);
        return ResponseEntity.ok(charData);
    }
}
