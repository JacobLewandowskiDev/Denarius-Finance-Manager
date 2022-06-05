package com.denarius.controller;

import com.denarius.model.CustomUserDetails;
import com.denarius.service.UserDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/userinterface.html")
public class UserDashboardController {

    @Autowired
    private final UserDashboardService userDashboardService;

    public UserDashboardController(UserDashboardService userDashboardService) {
        this.userDashboardService = userDashboardService;
    }

    @GetMapping("/get-total-expenses")
    public String[] getAllExpenses() {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDashboardService.getUserTotalExpenses(authenticatedUser.getId());
    }


    @GetMapping("/get-total-savings")
    public String getUserSavingsInfo() {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userDashboardService.getUserSavingsTotal(authenticatedUser.getId());
    }
}
