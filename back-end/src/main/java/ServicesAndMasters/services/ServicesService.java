package ServicesAndMasters.services;

import ServicesAndMasters.domain.User;
import ServicesAndMasters.dto.UserDto;
import ServicesAndMasters.dto.mapper.UserMapper;
import ServicesAndMasters.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    public List<UserDto> fetchAllUsers() {
        log.error("fetchAllFailed");
        return userRepository.findAll().stream().map(UserMapper::from).collect(Collectors.toList());
    }

    public UserDto addNewUser(UserDto userDto) {
        User newUser = User.builder()
                .name(userDto.getName())
                .age(userDto.getAge())
                .build();
        User savedUser = userRepository.save(newUser);
        log.info("User with id {} saved successfully.", savedUser.getUserId());
        return UserMapper.from(savedUser);
    }
}
