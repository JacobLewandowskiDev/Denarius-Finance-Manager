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

    @GetMapping("/allexpenses")
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping("/newexpense")
    public void addNewExpense(@RequestBody Expense expense) {
        expenseService.addExpense(expense);
    }
}
