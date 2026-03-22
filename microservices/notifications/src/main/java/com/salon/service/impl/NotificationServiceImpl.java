package com.salon.service.impl;

import com.salon.mapper.NotificationMapper;
import com.salon.model.Notification;
import com.salon.payload.dto.BookingDTO;
import com.salon.payload.dto.NotificationDTO;
import com.salon.repository.NotificationRepository;
import com.salon.service.NotificationService;
import com.salon.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final BookingFeignClient bookingFeignClient;

    @Override
    public NotificationDTO createNotification(Notification notification) throws Exception {
        Notification savedNotification = notificationRepository.save(notification);

        BookingDTO bookingDTO = bookingFeignClient.getBookingById(savedNotification.getBookingId()).getBody();

        return NotificationMapper.toDTO(savedNotification, bookingDTO);
    }

    @Override
    public List<Notification> getAllNotificationByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getAllNotificationBySalonId(Long salonId) {
        return notificationRepository.findBySalonId(salonId);
    }

    @Override
    public Notification markNotificationAsRead(Long notificationId) {
        return notificationRepository.findById(notificationId)
                .map(
                        notification -> {
                            notification.setIsRead(true);
                            return notificationRepository.save(notification);
                        }
                ).orElseThrow(()-> new RuntimeException("Notification not found"));
    }
}
