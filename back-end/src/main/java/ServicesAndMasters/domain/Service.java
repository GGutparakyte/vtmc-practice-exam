package ServicesAndMasters.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "serviceName")
    @NonNull
    private String serviceName;

    @Column(name = "serviceAddress")
    @NonNull
    private String serviceAddress;

    @Column(name = "serviceCEO")
    @NonNull
    private String serviceCEO;
}
