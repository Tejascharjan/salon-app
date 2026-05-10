package com.salon.controller;

import com.salon.domain.BookingStatus;
import com.salon.domain.PaymentMethod;
import com.salon.dto.*;
import com.salon.mapper.BookingMapper;
import com.salon.model.Booking;
import com.salon.model.SalonReport;
import com.salon.service.BookingService;
import com.salon.service.client.PaymentFeignClient;
import com.salon.service.client.SalonFeignClient;
import com.salon.service.client.ServiceOfferingFeignClient;
import com.salon.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final SalonFeignClient salonFeignClient;
    private final UserFeignClient userFeignClient;
    private final ServiceOfferingFeignClient serviceOfferingFeignClient;
    private final PaymentFeignClient paymentFeignClient;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createBooking(@RequestParam Long salonId,
                                                 @RequestParam PaymentMethod paymentMethod,
                                                 @RequestBody BookingRequest bookingRequest,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();

        SalonDTO salon = salonFeignClient.getSalonById(salonId).getBody();

        Set<ServiceDTO> serviceDTOSet = serviceOfferingFeignClient.getServicesByIds(bookingRequest.getServiceIds()).getBody();

        if(serviceDTOSet.isEmpty()){
            throw new Exception("service not found");
        }

        Booking booking = bookingService.createBooking(bookingRequest, user, salon, serviceDTOSet);

        Set<ServiceDTO> services=serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
        UserDTO customer = userFeignClient.getUserById(booking.getCustomerId()).getBody();
        BookingDTO bookingDTO = BookingMapper.toDTO(booking, services, salon, customer);

        PaymentLinkResponse response = paymentFeignClient.createPaymentLink(bookingDTO, paymentMethod,jwt).getBody();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingsByCustomer(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();
        if (user == null || user.getId() == null) {
            throw new Exception("user not found from jwt token");
        }
        List<Booking> bookings = bookingService.getBookingsByCustomer(user.getId());
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingsBySalon(@RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingsBySalon(salonDTO.getId());
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }


    private Set<BookingDTO> getBookingDTOs(List<Booking> bookings) {
        return bookings.stream().map(booking -> {
            Set<ServiceDTO> services=serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
            SalonDTO salon;
            UserDTO user;
            try {
                salon = salonFeignClient.getSalonById(booking.getSalonId()).getBody();
                user = userFeignClient.getUserById(booking.getCustomerId()).getBody();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return BookingMapper.toDTO(booking, services, salon, user);
        }).collect(Collectors.toSet());
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId) throws Exception {
        Booking booking = bookingService.getBookingById(bookingId);
        Set<ServiceDTO> services=serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
        UserDTO customer = userFeignClient.getUserById(booking.getCustomerId()).getBody();
        SalonDTO salon = salonFeignClient.getSalonById(booking.getSalonId()).getBody();
        return ResponseEntity.ok(BookingMapper.toDTO(booking, services,salon, customer));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(@PathVariable Long bookingId, @RequestParam BookingStatus status) throws Exception {
        Booking booking = bookingService.updateBookingStatus(bookingId, status);

        Set<ServiceDTO> services=serviceOfferingFeignClient.getServicesByIds(booking.getServiceIds()).getBody();
        UserDTO customer = userFeignClient.getUserById(booking.getCustomerId()).getBody();
        SalonDTO salon = salonFeignClient.getSalonById(booking.getSalonId()).getBody();
        return ResponseEntity.ok(BookingMapper.toDTO(booking, services,salon, customer));
    }

    @GetMapping("/slots/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingSlotDTO>> getBookedSlot(@PathVariable Long salonId, @PathVariable(required = false) LocalDate date) throws Exception {
        List<Booking> bookings = bookingService.getBookingsByDate(date, salonId);

        List<BookingSlotDTO> slotDTOS = bookings.stream()
                .map(booking -> {
                    BookingSlotDTO slotDTO = new BookingSlotDTO();
                    slotDTO.setStartTime(booking.getStartTime());
                    slotDTO.setEndTime(booking.getEndTime());
                    return slotDTO;
                }).collect(Collectors.toList());

        return ResponseEntity.ok(slotDTOS);
    }

    @GetMapping("/report")
    public ResponseEntity<SalonReport> getSalonReport(@RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        SalonReport report = bookingService.getSalonReport(salonDTO.getId());
        return ResponseEntity.ok(report);
    }

}
