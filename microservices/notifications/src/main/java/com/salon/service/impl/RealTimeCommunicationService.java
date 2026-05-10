package com.salon.service.impl;

import com.salon.payload.dto.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RealTimeCommunicationService {
    private final SimpMessagingTemplate template;

    public void sendNotification(NotificationDTO notificationDTO) {
        template.convertAndSend("/notification/user/" + notificationDTO.getUserId(), notificationDTO);
        template.convertAndSend("/notification/salon/" + notificationDTO.getSalonId(), notificationDTO);
    }
}
