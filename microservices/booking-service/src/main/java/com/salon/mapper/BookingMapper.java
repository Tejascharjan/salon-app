package com.salon.mapper;

import com.salon.dto.BookingDTO;
import com.salon.dto.SalonDTO;
import com.salon.dto.ServiceDTO;
import com.salon.dto.UserDTO;
import com.salon.model.Booking;

import java.util.Set;

public class BookingMapper {

    public static BookingDTO toDTO(Booking booking, Set<ServiceDTO> services, SalonDTO salon, UserDTO user) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setServiceIds(booking.getServiceIds());

        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setSalon(salon);

        bookingDTO.setServices(services);
        bookingDTO.setUser(user);
        return bookingDTO;
    }
}
