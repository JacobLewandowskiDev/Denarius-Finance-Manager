package com.denarius.controller;

import com.denarius.model.Expense;
import com.denarius.model.Savings;
import com.denarius.service.UserDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/userinterface.html")
public class UserDashboardController {

    @Autowired
    private final UserDashboardService userDashboardService;

    public UserDashboardController(UserDashboardService userDashboardService) {
        this.userDashboardService = userDashboardService;
    }

    @GetMapping("/get-total-expenses")
    public List<Expense> getAllExpenses() {
        return userDashboardService.getUserTotalExpenses();
    }


    @GetMapping("/get-total-savings")
    public Optional<Savings> getUserSavingsInfo(@RequestParam(name = "id") Long id) {
        return this.userDashboardService.getUserSavingsTotal(id);
    }
}
