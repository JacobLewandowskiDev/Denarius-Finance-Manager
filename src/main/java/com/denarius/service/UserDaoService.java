package com.denarius.service;

import com.denarius.model.User;
import com.denarius.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("finance_manager")
public abstract class UserDaoService implements UserRepository {

    private PasswordEncoder encoder;
    private UserRepository userRepository;

    @Autowired
    public UserDaoService(PasswordEncoder encoder, UserRepository userRepository) {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return getAllUsers()
                .stream()
                .filter(user -> username.equals(user.getUsername()))
                .findFirst();
    }

    public List<User> getAllUsers() {
        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            System.out.println(user.getUsername());
        }
        return userList;
    }
}
