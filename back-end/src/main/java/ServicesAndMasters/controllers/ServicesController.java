package ServicesAndMasters.controllers;
import ServicesAndMasters.dto.ServiceDto;
import ServicesAndMasters.services.ServicesService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServicesController {
private final ServicesService servicesService;

    @GetMapping
    @Operation(summary = "Fetches all services")
    public List<ServiceDto> fetchServices() {
        return servicesService.fetchAllServices();
    }

    @PostMapping(value = "/newService")
    @Operation(summary = "Adds a new service")
    public ServiceDto addNewService(@RequestBody ServiceDto serviceDto) {
        return servicesService.addNewService(serviceDto);
    }

    @PutMapping("/editService/{id}")
    @Operation(summary = "Edits an existing service")
    public ServiceDto editService(@PathVariable Integer id, @RequestBody ServiceDto serviceDto) {
        return servicesService.editService(id, serviceDto);
    }

    @DeleteMapping("/deleteService/{id}")
    @Operation(summary = "Deletes a service")
    public void deleteService(@PathVariable Integer id) {
        servicesService.deleteService(id);
    }

}
