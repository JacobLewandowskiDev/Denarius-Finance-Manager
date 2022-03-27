package com.financeapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/")
public class StaticController {

    // Redirect back to the login page <index.html> whenever a "/login" request is sent
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView method() {
        System.out.println("log in attempt");
        return new ModelAndView("index.html");
    }
}
