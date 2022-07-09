create table user(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(16) NOT NULL,
   email VARCHAR(255) NOT NULL,
   birthday DATE NOT NULL,
   password TEXT NOT NULL,
   verification BOOLEAN DEFAULT false,
   verification_token TEXT NULL,
   forgot_password_token TEXT NULL,
  `is_active` binary(1) DEFAULT '1',
   PRIMARY KEY ( id ),
   CONSTRAINT uc_username UNIQUE (username),
   CONSTRAINT email UNIQUE (email)
);