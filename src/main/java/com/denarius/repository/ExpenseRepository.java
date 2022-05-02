package com.denarius.repository;

import com.denarius.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "finance_manager")
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
