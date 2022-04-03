package com.denarius.repository;

import com.denarius.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(value = "finance_manager")
public interface UserRepositoryDao extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

}
