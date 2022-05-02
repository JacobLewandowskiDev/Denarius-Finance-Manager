package com.denarius.controller;

import com.denarius.model.Expense;
import com.denarius.service.ExpenseService;
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
        return expenseService.getAllExpenses();
    }

    // Add new expense to the database
    @PostMapping("/new-expense")
    public void addNewExpense(@RequestBody Expense expense) {
        expenseService.addExpense(expense);
    }

    // Remove expense from the database
    @DeleteMapping("/delete-expense")
    public void deleteExpense(@RequestParam long id) {
        expenseService.deleteExpense(id);
    }

    // Remove expense from the database
    @PutMapping("/update-expense")
    public void updateExpense(@RequestParam long id, @RequestBody Expense expense) {
        expenseService.updateExpense(id, expense);
    }
}
