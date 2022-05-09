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

    public Optional<Savings> getUserSavingsInfo(Long id) {
        System.out.println("Returned the users saving info");
        Optional<Savings> savings = this.savingsRepository.findById(id);
        return savings;
    }

    public void updatePartialSavingsInfo(Long id, Savings savings) {
        Savings found = this.savingsRepository.getById(id);
        if(found != null) {
            found.setCurrentGoal(savings.getCurrentGoal());
            System.out.println("CurrentGoal: " + found.getCurrentGoal());
            found.setCurrentGoalDate(savings.getCurrentGoalDate());
            System.out.println("CurrentGoalDate: " + found.getCurrentGoalDate());
            found.setUserSavedForCurrentGoal(savings.getUserSavedForCurrentGoal());
            System.out.println("UserSavedForCurrentGoal: " + found.getUserSavedForCurrentGoal());
            this.savingsRepository.save(found);
            System.out.println("Savings using the id:" + id + " have been partially updated in the database");
        }
    }

    // Update all existing savings info for the user if they exist, if not then create default ones
    public void updateAllSavingsInfo(Long id, Savings savings) {
        Savings found = this.savingsRepository.getById(id);
        if(found != null) {
            found.setCurrentGoal(savings.getCurrentGoal());
            found.setCurrentGoalDate(savings.getCurrentGoalDate());
            found.setUserSavedForCurrentGoal(savings.getUserSavedForCurrentGoal());
            found.setTotalSavings(savings.getTotalSavings());
            this.savingsRepository.save(found);
            System.out.println("Savings using the id:" + id + " have been updated in the database");
        }
    }
}
