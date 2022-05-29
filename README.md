# DENARIUS - Personal Finance Manager
![](images/Denarius.jpg =250x)
## Application Description
  Denarius - The name of the web app comes from a silver coin used in ancient Rome. This web app helps its users with managing their finances. The client side of the   application can setup saving goals they wish to achieve by a certain date and track their expenses, the backend then takes care of storing that data and performing all of the calculations upon a specific endpoint request call. The webapp also tracks the information of the top 20 trading Cryptocurrencies and updates the information every 2 minutes using tht CoinMarketCap API.

## User Features
  - Login into one of the premade accounts (Role-based authentication: normal user or admin user).
  - Contact the creator (that's me) via email
  - Manage your finances, by using the wide variety of functions presented to the user within the user interface
  - Use CRUD operations to keep track of your expenses
  - Track your spending on specific categories
  - Track the prices of the top 20 trading cryptocurrencies using the CoinMarketCap API (Updates every 2 minutes)
  
## Tech stack used for the project
  - Back-end: Java 11
  - Data storage: MySQL.
  - Front-end: HTML, CSS, JavaScript
  - Project build and management automation: Maven 3.8.3
  - Java Frameworks: Spring ver 2.6.3
  - CoinMarketCap API

## How To Run The Application
  1. Copy the repository
  2. In your IDE run the following command in the terminal: 'mvn package' 
  3. After the code has finished compiling make sure all of the required dependencies are downloaded
  4. After completing steps 1-3 run the main method from the 'DenariusApplication.class' 
  5. After the application starts open MySQL Workbench and create the Schema finance_manager
  6. Create all of the tables and perform all of the INSERTS within the Schema (Refer to Schema in the readme.md for reference)
  7. Restart the application by running the main method from the 'DenariusApplication.class'
  8. You are set to use the web app
  9. Open your browser and go to 'localhost:8080'
  10. From here you may log in as one of the default normal users, or as an admin using the given login parameters.

## Schema
```
USE finance_manager;

INSERT INTO user (id, username, password) VALUES(1, 'admin', '$2a$07$meO8oEFk9Flf7vTaR4nCG.yWUTdDx1IMVcW3ZGAdeehP.P8tIFz.O');
INSERT INTO user (id, username, password) VALUES(2, 'user', '$2a$07$cTaTTiLkhstoHKLnA2/FxeqPgkSGdp9XiQADgOsiBVv4.3lOxst3G');
INSERT INTO user (id, username, password) VALUES(3, 'testuser', '$2a$07$cTaTTiLkhstoHKLnA2/FxeqPgkSGdp9XiQADgOsiBVv4.3lOxst3G');

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
);

INSERT INTO `roles` (`name`) VALUES ('ADMIN');
INSERT INTO `roles` (`name`) VALUES ('USER');

CREATE TABLE `users_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  KEY `user_fk_idx` (`user_id`),
  KEY `role_fk_idx` (`role_id`),
  CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (2, 2);
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (3, 2);

INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-03-12', 'Coffee & Lunch', '25.99', 'Food', '2');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-01-28', 'Gym membership', '59.99', 'Personal', '2');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-05-01', 'Amazon Prime', '14.99', 'Utilities', '2');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-02-05', 'Gasoline', '135.73', 'Transportation', '2');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-04-18', 'Ice cream', '125.50', 'HealthCare', '2');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-02-21', 'Rent', '499', 'Housing', '2');

INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-02-21', 'Clothes', '265', 'Personal', '3');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-04-01', 'test1', '65', 'HealthCare', '3');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-01-13', 'test2', '25', 'Food', '3');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2021-04-25', 'test3', '15', 'Food', '3');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-05-28', 'test4', '95', 'Utilities', '3');
INSERT INTO expenses (date, expense_name, cost, category, user_id) VALUES ('2022-02-11', 'Clothes', '36', 'Housing', '3');

INSERT INTO savings (current_goal, current_goal_date, monthly_saving_amount, total_savings, user_id, user_saved_for_current_goal, goal_reached) VALUES('0.00', '2022-06', '0.00', '0.00', '2', '0.00', 0);
INSERT INTO savings (current_goal, current_goal_date, monthly_saving_amount, total_savings, user_id, user_saved_for_current_goal, goal_reached) VALUES('0.00', '2022-06', '0.00', '0.00', '3', '0.00', 0);

```

## Future features
- Implement new user method
