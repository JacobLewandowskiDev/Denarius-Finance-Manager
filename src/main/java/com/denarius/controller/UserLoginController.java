package com.denarius.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/index")
public class UserLoginController {

    @GetMapping("user-login")
    public ModelAndView loginView() {
        System.out.println("There was a login attempt");
        return new ModelAndView("user-login");
    }

    @GetMapping("go-back")
    public ModelAndView logout() {
        System.out.println("Rerouting back to home page");
        return new ModelAndView("index");
    }
}
