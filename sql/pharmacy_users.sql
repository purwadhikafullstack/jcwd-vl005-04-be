-- pharmacy.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `password` text NOT NULL,
  `verification` tinyint(1) DEFAULT '0',
  `verification_token` text,
  `forgot_password_token` text,
  `is_active` binary(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;