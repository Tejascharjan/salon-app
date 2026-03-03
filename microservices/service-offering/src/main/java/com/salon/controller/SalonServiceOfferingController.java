package com.salon.controller;

import com.salon.dto.CategoryDTO;
import com.salon.dto.SalonDTO;
import com.salon.dto.ServiceDTO;
import com.salon.model.ServiceOffering;
import com.salon.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    @PostMapping
    public ResponseEntity<ServiceOffering> createService(@RequestBody ServiceDTO serviceDTO) {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(serviceDTO.getCategoryId());

        ServiceOffering serviceOfferings = serviceOfferingService.createService(salonDTO, serviceDTO, categoryDTO);
        return ResponseEntity.ok(serviceOfferings);
    }

    @PostMapping("/{serviceId}")
    public ResponseEntity<ServiceOffering> updateService(@PathVariable Long serviceId, @RequestBody ServiceOffering serviceOffering) throws Exception {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(1L);

        ServiceOffering serviceOfferings = serviceOfferingService.updateService(serviceId,serviceOffering);
        return ResponseEntity.ok(serviceOfferings);
    }

}
