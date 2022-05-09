package com.denarius.controller;

import com.denarius.model.Savings;
import com.denarius.service.SavingsService;
import org.springframework.http.ResponseEntity;
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
    public Optional<Savings> getUserSavingsInfo(@RequestParam(name = "id") Long id) {
        return this.savingsService.getUserSavingsInfo(id);
    }

    // Partially update the savings information of a user (savings goal and date)
    @PatchMapping("/update-partial-savings")
    public void updatePartialUserSavingsInfo(@RequestParam Long id, @RequestBody Savings savings) {
        this.savingsService.updatePartialSavingsInfo(id, savings);
    }

    // Update all the savings information of a user
    @PutMapping("/update-all-savings")
    public void updateAllUserSavingsInfo(@RequestParam Long id, @RequestBody Savings savings) {
        this.savingsService.updateAllSavingsInfo(id,savings);
    }
}
