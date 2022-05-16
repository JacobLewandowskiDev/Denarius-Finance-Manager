package com.denarius.controller;

import com.denarius.model.User;
import com.denarius.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admininterface.html")
public class RepoController {

    @Autowired
    private UserRepository userRepository;

    // Return a list of usernames to when the endpoint is called
    @GetMapping("/get-user-list")
    public @ResponseBody
    List<String> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<String> usernames = new ArrayList<String>();
        for (User user : users) {
            usernames.add(user.getUsername());
        }
        return usernames;
    }
}
