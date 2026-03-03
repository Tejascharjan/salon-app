package com.salon.service;

import com.salon.dto.CategoryDTO;
import com.salon.dto.SalonDTO;
import com.salon.dto.ServiceDTO;
import com.salon.model.ServiceOffering;

import java.util.Set;

public interface ServiceOfferingService {

    ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO, CategoryDTO categoryDTO);

    ServiceOffering updateService(Long serviceId, ServiceOffering serviceOffering) throws Exception;

    Set<ServiceOffering> getAllServiceBySalon(Long salonId, Long categoryId);

    Set<ServiceOffering> getServicesByIds(Set<Long> ids);

    ServiceOffering getServiceById(Long id) throws Exception;
}
