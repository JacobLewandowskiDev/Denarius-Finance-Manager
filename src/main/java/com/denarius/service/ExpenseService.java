package com.denarius.service;


import com.denarius.model.CustomUserDetails;
import com.denarius.model.Expense;
import com.denarius.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService{

    @Autowired
    private ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses(int id) {
        long userId = id;
        System.out.println("getAllExpenses call: Returned a list of all expenses for userId: " + userId);
        return expenseRepository.getAllUserExpenses(userId);
    }

    public void addExpense(int id,Expense expense) {
        System.out.println("addExpense call: " + expense.getExpenseName() + " was added to the database for userId: " + id);
        expense.setUserId(id);
        this.expenseRepository.save(expense);
    }

    public void deleteExpense(int userId, long expenseId) {
        Expense found = this.expenseRepository.getById(expenseId);

        if(found.getUserId() == userId) {
            this.expenseRepository.deleteById(expenseId);
            System.out.println("deleteExpense call: Position " + expenseId + " was deleted from the database");
        }
    }

    public void updateExpense(int userId, long expenseId, Expense expense) {
        Expense found = this.expenseRepository.getById(expenseId);

        if(found.getUserId() == userId) {
            found.setDate(expense.getDate());
            found.setExpenseName(expense.getExpenseName());
            found.setCost(expense.getCost());
            found.setCategory(expense.getCategory());
            this.expenseRepository.save(found);
            System.out.println("updateExpense call: Position " + expenseId + " was updated in the database");
        }
    }
}
