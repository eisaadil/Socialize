package com.eisaadil.services;

import com.eisaadil.Helpers;
import com.eisaadil.models.User;
import com.eisaadil.repositories.UserJDBC;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by eisaadil on 22/08/17.
 */
@Service
public class UserService {
    @Autowired
    private UserJDBC userJdbcTemplate;

    public String authenticateUser(String username, String password) {
        /*
            Response:
                1: Login authenticated -- status, data
                0: Login failed -- status
         */
        if (userJdbcTemplate.isUserAuthenticated(username, password)) {
            JsonObject response = new JsonObject();
            response.addProperty("status", 1);
            response.add("data", (new Gson()).toJsonTree(userJdbcTemplate.getUserFromUsername(username)));
            return response.toString();
        } else {
            JsonObject response = new JsonObject();
            response.addProperty("status", 0);
            return response.toString();
        }
    }

    public String createUser(User user) {
        /*
            Response:
                1: Sign Up successful -- status, data
                0: Sign Up failed -- status (username already taken)
         */
        User newUser = userJdbcTemplate.createUser(user);
        return Helpers.getDataInJSONHelperReturnsData(newUser);
    }

    public String isUsernameAvailable(String username) {
        /*
            Response:
                1: Username is available -- status
                0: Username is unavailable -- status
         */
        return Helpers.getDataInJSONHelperReturnsBoolean(userJdbcTemplate.isUsernameAvailable(username));
    }

    public String deleteUserFromId(long id) {
        /*
            Response:
                1: User successfully deleted -- status
                0: User could not be deleted -- status
         */
        return Helpers.getDataInJSONHelperReturnsBoolean(userJdbcTemplate.deleteUserFromId(id));
    }

    public String getUserFromId(long id) {
        /*
            Response:
                1: Got user -- status, data
                0: Failed to get user -- status
         */
        User user = userJdbcTemplate.getUserFromId(id);
        return Helpers.getDataInJSONHelperReturnsData(user);
    }

    public String getUserFromUsername(String username) {
        /*
            Response:
                1: Got user -- status, data
                0: Failed to get user -- status
         */
        User user = userJdbcTemplate.getUserFromUsername(username);
        return Helpers.getDataInJSONHelperReturnsData(user);
    }

    public String updateUserFromId(User user) {
        User newUser = userJdbcTemplate.updateUserFromId(user.getId(), user);
        return Helpers.getDataInJSONHelperReturnsData(newUser);
    }

    public String getAllUsers() {
        List<User> allUsers = userJdbcTemplate.getAllUsers();
        return Helpers.getDataInJSONHelperReturnsData(allUsers);
    }
}
