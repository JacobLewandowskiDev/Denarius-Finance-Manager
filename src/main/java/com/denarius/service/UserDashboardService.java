package com.denarius.service;

import com.denarius.model.CustomUserDetails;
import com.denarius.model.Expense;
import com.denarius.model.Savings;
import com.denarius.model.User;
import com.denarius.repository.ExpenseRepository;
import com.denarius.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
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
