package ServicesAndMasters.services;

import ServicesAndMasters.domain.Service;
import ServicesAndMasters.dto.ServiceDto;
import ServicesAndMasters.dto.mapper.ServiceMapper;
import ServicesAndMasters.repositories.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class ServicesService {
    private final ServiceRepository serviceRepository;
    public List<ServiceDto> fetchAllServices() {
        log.error("fetchAllFailed");
        return serviceRepository.findAll().stream().map(ServiceMapper::from).collect(Collectors.toList());
    }

    public ServiceDto addNewService(ServiceDto serviceDto) {
        Service newService = Service.builder()
                .serviceName(serviceDto.getServiceName())
                .serviceAddress(serviceDto.getServiceAddress())
                .serviceCEO(serviceDto.getServiceCEO())
                .build();
        Service savedService = serviceRepository.save(newService);
        log.info("Service with id {} saved successfully.", savedService.getServiceId());
        return ServiceMapper.from(savedService);
    }

    public ServiceDto editService(Integer serviceId, ServiceDto serviceDto) {
        Service existingService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + serviceId));

        existingService.setServiceName(serviceDto.getServiceName());
        existingService.setServiceAddress(serviceDto.getServiceAddress());
        existingService.setServiceCEO(serviceDto.getServiceCEO());

        Service updatedService = serviceRepository.save(existingService);
        log.info("Service with id {} updated successfully.", updatedService.getServiceId());
        return ServiceMapper.from(updatedService);
    }

    public void deleteService(Integer serviceId) {
        Service existingService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + serviceId));

        serviceRepository.delete(existingService);
        log.info("Service with id {} deleted successfully.", serviceId);
    }
}
