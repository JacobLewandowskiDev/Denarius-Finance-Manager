package com.denarius.model;

import javax.persistence.*;

@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "currentGoal")
    private double currentGoal;

    @Column(name = "currentGoalDate")
    private String currentGoalDate;

    @Column(name = "userSavedForCurrentGoal")
    private double userSavedForCurrentGoal;

    @Column(name = "totalSavings")
    private double totalSavings;

    @Column(name = "goalReached")
    private boolean goalReached;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getCurrentGoal() {
        return currentGoal;
    }

    public void setCurrentGoal(double currentGoal) {
        this.currentGoal = currentGoal;
    }

    public String getCurrentGoalDate() {
        return currentGoalDate;
    }

    public void setCurrentGoalDate(String currentGoalDate) {
        this.currentGoalDate = currentGoalDate;
    }

    public double getUserSavedForCurrentGoal() {
        return userSavedForCurrentGoal;
    }

    public void setUserSavedForCurrentGoal(double userSavedForCurrentGoal) {
        this.userSavedForCurrentGoal = userSavedForCurrentGoal;
    }

    public double getTotalSavings() {
        return totalSavings;
    }

    public void setTotalSavings(double totalSavings) {
        this.totalSavings = totalSavings;
    }

    public boolean getGoalReached() {
        return goalReached;
    }

    public void setGoalReached(boolean goalReached) {
        this.goalReached = goalReached;
    }
}
