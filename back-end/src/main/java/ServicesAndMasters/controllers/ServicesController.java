package ServicesAndMasters.controllers;
import ServicesAndMasters.dto.UserDto;
import ServicesAndMasters.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
private final UserService userService;

    @GetMapping
    @Operation(summary = "Fetches all users")
    public List<UserDto> fetchUsers() {
        return userService.fetchAllUsers();
    }

    @PostMapping
    @Operation(summary = "Adds a new user")
    public UserDto addNewUser(@RequestBody UserDto userDto) {
        return userService.addNewUser(userDto);
    }
}
