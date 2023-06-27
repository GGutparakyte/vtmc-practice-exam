package ServicesAndMasters.repositories;

import ServicesAndMasters.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Service, Integer> {

}
