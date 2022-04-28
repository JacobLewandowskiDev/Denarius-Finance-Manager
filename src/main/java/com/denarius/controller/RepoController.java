package com.denarius.controller;

import com.denarius.model.User;
import com.denarius.repository.UserRepositoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class RepoController {

    @Autowired
    private UserRepositoryDao userRepositoryDao;

    @GetMapping("/all")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        return userRepositoryDao.findAll();
    }

    @PostMapping("/add")
    @RequestMapping("/")
    public String addUser(User user) {
        return "User was added";
    }

}
