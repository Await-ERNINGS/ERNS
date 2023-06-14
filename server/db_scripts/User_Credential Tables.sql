CREATE TABLE user_credentials (
  User_ID INT PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(50),
  Password VARCHAR(255),
  Transaction_ID INT,
  FOREIGN KEY (Transaction_ID) REFERENCES transactions(Transaction_ID)
);