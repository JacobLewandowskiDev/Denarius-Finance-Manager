package com.denarius.service;


import com.denarius.model.Expense;
import com.denarius.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService{

    @Autowired
    private ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        System.out.println("Returned all expenses");
        return expenseRepository.findAll();
    }

    public void addExpense(Expense expense) {
        System.out.println("saved it");
        this.expenseRepository.save(expense);
    }
}
