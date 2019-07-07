package com.eisaadil;

import com.eisaadil.models.User;
import com.eisaadil.repositories.UserJDBC;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@SpringBootApplication
public class SocializeApplication {

    @Value("${name}")
    String myValue;

    @Autowired
    private UserJDBC userJdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(SocializeApplication.class, args);
    }

    @RequestMapping("/hello")
    public String helloWorld() {
        return "Hi check log please";
    }

    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:63342")
    public String allRecords() {
        List<User> userList = userJdbcTemplate.getAllUsers();
        return ((new Gson()).toJson(userList));
    }
}
