package com.denarius.controller;

import com.denarius.model.CustomUserDetails;
import com.denarius.model.Savings;
import com.denarius.service.SavingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/saving-goals.html")
public class SavingsController {

    private final SavingsService savingsService;

    public SavingsController(SavingsService service) {
        this.savingsService = service;
    }

    @GetMapping("/get-savings-info")
    public Optional<Savings> getUserSavingsInfo() {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.savingsService.getUserSavingsInfo(authenticatedUser.getId());
    }

    // Update all the savings information of a user
    @PutMapping("/update-savings")
    public void updateUserSavingsInfo(@RequestBody Savings savings) {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.savingsService.updateUserSavingsInfo(authenticatedUser.getId(), savings);
    }
}
