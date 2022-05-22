package com.denarius.repository;

import com.denarius.model.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {

    @Query(value = "SELECT total_savings FROM savings WHERE user_id = :userId", nativeQuery = true)
    String getTotalSavings(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM savings WHERE user_id = :userId", nativeQuery = true)
    Optional<Savings> getUserSavingsInfo(@Param("userId") Long userId);
}
