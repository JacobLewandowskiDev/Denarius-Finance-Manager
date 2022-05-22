package com.denarius.controller;

import com.denarius.model.CustomUserDetails;
import com.denarius.model.Expense;
import com.denarius.service.ExpenseService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses.html")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Return list of expenses to the expenses.html page
    @GetMapping("/all-expenses")
    public List<Expense> getAllExpenses() {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return expenseService.getAllExpenses(authenticatedUser.getId());
    }

    // Add new expense to the database
    @PostMapping("/new-expense")
    public void addNewExpense(@RequestBody Expense expense) {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        expenseService.addExpense(authenticatedUser.getId(), expense);
    }

    // Remove expense from the database
    @DeleteMapping("/delete-expense")
    public void deleteExpense(@RequestParam long id) {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        expenseService.deleteExpense(authenticatedUser.getId(), id);
    }

    // Remove expense from the database
    @PutMapping("/update-expense")
    public void updateExpense(@RequestParam long id, @RequestBody Expense expense) {
        CustomUserDetails authenticatedUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        expenseService.updateExpense(authenticatedUser.getId(), id, expense);
    }
}
