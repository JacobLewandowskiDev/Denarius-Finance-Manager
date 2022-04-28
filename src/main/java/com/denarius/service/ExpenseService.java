package com.denarius.service;

import com.denarius.model.Expense;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpenseService {

    List<Expense> getAllExpenses();
    void addExpense(Expense expense);
}
