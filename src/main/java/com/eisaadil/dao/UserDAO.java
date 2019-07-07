package com.eisaadil.dao;

import com.eisaadil.models.User;

import java.util.List;

/**
 * Created by eisaadil on 03/08/17.
 */
public interface UserDAO {
    User createUser(User user);

    boolean isUserAuthenticated(String username, String password);

    User getUserFromUsername(String username);

    User getUserFromId(long id);

    User updateUserFromId(long id, User newUser);

    boolean isUsernameAvailable(String username);

    boolean deleteUserFromId(long id);

    List<User> getAllUsers();
}
