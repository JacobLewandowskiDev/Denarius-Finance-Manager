DROP DATABASE IF EXISTS finance_manager;
CREATE DATABASE IF NOT EXISTS finance_manager;
USE finance_manager;

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS users_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS savings;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

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

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `expense_name` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

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

CREATE TABLE `savings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_goal` decimal(10,2) NOT NULL,
  `current_goal_date` date NOT NULL,
  `monthly_saving_amount` decimal(10,2) NOT NULL,
  `total_savings` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_saved_for_current_goal` decimal(10,2) NOT NULL,
  `goal_reached` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_savings_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

INSERT INTO savings (current_goal, current_goal_date, monthly_saving_amount, total_savings, user_id, user_saved_for_current_goal, goal_reached) VALUES('0.00', '2022-06-01', '0.00', '0.00', '2', '0.00', 0);
INSERT INTO savings (current_goal, current_goal_date, monthly_saving_amount, total_savings, user_id, user_saved_for_current_goal, goal_reached) VALUES('0.00', '2022-05-01', '0.00', '0.00', '3', '0.00', 0);