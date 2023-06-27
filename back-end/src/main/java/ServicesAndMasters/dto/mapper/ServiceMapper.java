package ServicesAndMasters.dto.mapper;

import ServicesAndMasters.domain.Service;
import ServicesAndMasters.dto.ServiceDto;

public class UserMapper {
    public static ServiceDto from (Service user) {
        ServiceDto serviceDto = new ServiceDto();
        serviceDto.setUserId(user.getUserId());
        serviceDto.setName(user.getName());
        serviceDto.setAge(user.getAge());

        return serviceDto;
    }
}
