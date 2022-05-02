package com.denarius.service;


import com.denarius.model.Expense;
import com.denarius.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
        return expenseRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
    }

    public void addExpense(Expense expense) {
        System.out.println("Saved expense: " + expense.getExpenseName() + " to the database");
        this.expenseRepository.save(expense);
    }

    public void deleteExpense(long id) {
        this.expenseRepository.deleteById(id);
        System.out.println("Expense using the id:" + id + " was deleted from the database");
    }

    public void updateExpense(long id, Expense expense) {
        Expense found = this.expenseRepository.getById(id);
        found.setDate(expense.getDate());
        found.setExpenseName(expense.getExpenseName());
        found.setCost(expense.getCost());
        found.setCategory(expense.getCategory());
        this.expenseRepository.save(found);
        System.out.println("Expense using the id:" + id + " was updated in the database");
    }
}
