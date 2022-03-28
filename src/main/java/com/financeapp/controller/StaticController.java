package com.financeapp.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/")
public class StaticController {

    // Redirect back to the login page <index.html> whenever a "/login" request is sent
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView redirectUser() {
        System.out.println("log in attempt");
        System.out.println(SecurityContextHolder.getContext());
        return new ModelAndView("index.html");
    }
}
