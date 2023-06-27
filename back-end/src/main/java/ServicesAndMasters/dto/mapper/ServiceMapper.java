package ServicesAndMasters.dto.mapper;

import ServicesAndMasters.domain.Service;
import ServicesAndMasters.dto.ServiceDto;

public class ServiceMapper {
    public static ServiceDto from (Service service) {
        ServiceDto serviceDto = new ServiceDto();
        serviceDto.setServiceId(service.getServiceId());
        serviceDto.setServiceName(service.getServiceName());
        serviceDto.setServiceAddress(service.getServiceAddress());
        serviceDto.setServiceCEO(service.getServiceCEO());

        return serviceDto;
    }
}
