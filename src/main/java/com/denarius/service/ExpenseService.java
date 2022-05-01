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
        System.out.println("Returned a list of all expenses");
        return expenseRepository.findAll();
    }

    public void addExpense(Expense expense) {
        System.out.println("Saved expense: " + expense.getExpenseName() + " to the database");
        this.expenseRepository.save(expense);
    }

    public void deleteExpense(long id) {
        this.expenseRepository.deleteById(id);
        System.out.println("Expense using the id:" + id + " was deleted from the database");
    }
}
