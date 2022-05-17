package com.denarius.service;

import com.denarius.model.Expense;
import com.denarius.model.Savings;
import com.denarius.repository.ExpenseRepository;
import com.denarius.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDashboardService {

    @Autowired
    private SavingsRepository savingsRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public UserDashboardService(SavingsRepository savingsRepository, ExpenseRepository expenseRepository) {
        this.savingsRepository = savingsRepository;
        this.expenseRepository = expenseRepository;
    }

    public Optional<Savings> getUserSavingsTotal(Long id) {
        System.out.println("Returned the users total saving amount");
        Optional<Savings> savings = this.savingsRepository.findById(id);
        return savings;
    }

    public List<Expense> getUserTotalExpenses() {
        System.out.println("Returned a users total expenses");
        return expenseRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
    }
}
