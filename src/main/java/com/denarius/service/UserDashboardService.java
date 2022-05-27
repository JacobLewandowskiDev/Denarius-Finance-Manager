package com.denarius.service;

import com.denarius.repository.ExpenseRepository;
import com.denarius.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public String getUserSavingsTotal(int id) {
        long userId = id;
        System.out.println("getUserSavingsTotal call: Returned the total saving amount for userId: " + userId);
        return this.savingsRepository.getTotalSavings(userId);
    }

    public String[] getUserTotalExpenses(int id) {
        long userId = id;
        System.out.println("getUserTotalExpenses call: Returned the total expenses amount for userId: " + userId);
        return expenseRepository.getUserTotalExpense(userId);
    }
}
