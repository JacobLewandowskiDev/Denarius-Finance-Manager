package com.denarius.model;

/** This class is used strictly to create default users within the database if someone has downloaded my repo and wishes to play around with it.
 * Uncomment it if you are running the app for the first time. **/

//
//import com.denarius.repository.UserRepositoryDao;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//
//@Component
//public class DefaultDbOperationRunner implements CommandLineRunner {
//
//    @Autowired
//    private UserRepositoryDao userRepositoryDao;
//
//    @Autowired
//    private PasswordEncoder encoder;
//
//    @Override
//    public void run(String... args) throws Exception {
//        System.out.println("Im here");
//        userRepositoryDao.saveAll(List.of(
//                new User(
//                        1,
//                        "User",
//                        encoder.encode("pass"),
//                        "USER",
//                        true,
//                        true,
//                        true,
//                        true
//                ),
//
//                new User(
//                        2,
//                        "Admin",
//                        encoder.encode("pass"),
//                        "ADMIN",
//                        true,
//                        true,
//                        true,
//                        true
//                )
//        ));
//        System.out.println("Users were saved");
//    }
//}
