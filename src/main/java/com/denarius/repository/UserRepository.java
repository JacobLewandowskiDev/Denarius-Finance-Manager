package com.denarius.repository;

import com.denarius.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(value = "heroku_77a5006925d50fe")
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

}
