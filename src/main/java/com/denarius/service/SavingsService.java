package com.denarius.service;

import com.denarius.model.Savings;
import com.denarius.repository.SavingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class SavingsService {

    @Autowired
    private SavingsRepository savingsRepository;

    public SavingsService(SavingsRepository savingsRepository) {
        this.savingsRepository = savingsRepository;
    }

    public Optional<Savings> getUserSavingsInfo(int id) {
        long userId = id;
        System.out.println("getUserSavingsInfo call: Returned the users saving info for userId: " + userId);
        Optional<Savings> savings = this.savingsRepository.getUserSavingsInfo(userId);
        System.out.println("User savings: " + savings);
        return savings;
    }

    public void updateUserSavingsInfo(int userId, Savings savings) {
        Savings found = this.savingsRepository.getById(savings.getId());
        if(found.getUserId() == userId) {
            found.setCurrentGoal(savings.getCurrentGoal());
            found.setCurrentGoalDate(savings.getCurrentGoalDate());
            found.setMonthlySavingAmount(savings.getMonthlySavingAmount());
            found.setUserSavedForCurrentGoal(savings.getUserSavedForCurrentGoal());
            found.setTotalSavings(savings.getTotalSavings());
            found.setGoalReached(savings.getGoalReached());
            this.savingsRepository.save(found);
            System.out.println("updateUserSavingsInfo call: Position " + savings.getId() + " has been updated in the database");
        }
    }
}
