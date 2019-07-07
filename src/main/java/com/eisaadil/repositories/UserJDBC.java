package com.eisaadil.repositories;

import com.eisaadil.dao.UserDAO;
import com.eisaadil.mappers.UserMapper;
import com.eisaadil.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by eisaadil on 24/07/17.
 */


@Repository
public class UserJDBC implements UserDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User createUser(User user) {
        if (!isUsernameAvailable(user.getUsername())) return null;

        int affectedRows = jdbcTemplate.update("INSERT INTO users (username, password, fullName, email) VALUES (?,?,?,?)",
                user.getUsername(), user.getPassword(), user.getFullName(), user.getEmail());
        if (affectedRows == 0) return null;

        long lastInsertedId = jdbcTemplate.queryForObject("SELECT currval(pg_get_serial_sequence('users', 'id'))", Long.class);
        return getUserFromId(lastInsertedId);
    }

    public boolean isUserAuthenticated(String username, String password) {
        int found = jdbcTemplate.queryForObject("SELECT count(*) FROM users where username = ? and password = ?", Integer.class, username, password);
        return (found == 1);
    }

    public User getUserFromUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM users where username = ?", new Object[]{username}, new UserMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }

    }

    public User getUserFromId(long id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM users where id = ?", new Object[]{id}, new UserMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User updateUserFromId(long id, User newUser) {
        int affectedRows = jdbcTemplate.update("UPDATE users SET (username, password, fullName, email) = (?,?,?,?) WHERE id = ?",
                newUser.getUsername(), newUser.getPassword(), newUser.getFullName(), newUser.getEmail(), id);
        if (affectedRows == 0) return null;
        return getUserFromId(id);
    }

    public boolean isUsernameAvailable(String username) {
        int found = jdbcTemplate.queryForObject("SELECT count(*) FROM users where username = ?", Integer.class, username);
        return (found == 0);
    }

    public boolean deleteUserFromId(long id) {
        int affectedRows = jdbcTemplate.update("DELETE from users WHERE id = ?", id);
        return !(affectedRows == 0);
    }

    public List<User> getAllUsers() {
        try {
            return jdbcTemplate.query("SELECT * FROM users", new UserMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
