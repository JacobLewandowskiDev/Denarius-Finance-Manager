package com.denarius.repository;

import com.denarius.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(value = "SELECT cost FROM expenses WHERE user_id = :userId", nativeQuery = true)
    String[] getUserTotalExpense(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM expenses WHERE user_id = :userId ORDER BY date ASC", nativeQuery = true)
    List<Expense> getAllUserExpenses(@Param("userId") Long userId);
}
