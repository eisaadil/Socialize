package com.eisaadil.controllers;

import com.eisaadil.models.User;
import com.eisaadil.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by eisaadil on 03/08/17.
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public String authenticateUser(@RequestParam String username, @RequestParam String password) {
        return userService.authenticateUser(username, password);
    }

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public String createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestMapping(value = "/checkUsernameAvailable", method = RequestMethod.POST)
    public String isUsernameAvailable(@RequestParam String username) {
        return userService.isUsernameAvailable(username);
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public String deleteUserFromId(@RequestParam long id) {
        return userService.deleteUserFromId(id);
    }

    @RequestMapping(value = "/getUserFromId", method = RequestMethod.POST)
    public String getUserFromId(@RequestParam long id) {
        return userService.getUserFromId(id);
    }

    @RequestMapping(value = "/getUserFromUsername", method = RequestMethod.POST)
    public String getUserFromUsername(@RequestParam String username) {
        return userService.getUserFromUsername(username);
    }

    @RequestMapping(value = "/updateUserFromId", method = RequestMethod.POST)
    public String updateUserFromId(@RequestBody User user) {
        return userService.updateUserFromId(user);
    }

    @RequestMapping(value = "/getAllUsers", method = RequestMethod.POST)
    public String getAllUsers() {
        return userService.getAllUsers();
    }


}
