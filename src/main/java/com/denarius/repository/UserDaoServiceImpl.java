package com.denarius.repository;

import com.denarius.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("finance_manager")
public abstract class UserDaoServiceImpl implements UserRepositoryDao {

    private PasswordEncoder encoder;
    private UserRepositoryDao userRepositoryDao;

    @Autowired
    public UserDaoServiceImpl(PasswordEncoder encoder, UserRepositoryDao userRepositoryDao) {
        this.encoder = encoder;
        this.userRepositoryDao = userRepositoryDao;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return getAllUsers()
                .stream()
                .filter(user -> username.equals(user.getUsername()))
                .findFirst();
    }

    public List<User> getAllUsers() {
        List<User> userList = userRepositoryDao.findAll();
        for (User user : userList) {
            System.out.println(user.getUsername());
        }
        return userList;
    }
}
