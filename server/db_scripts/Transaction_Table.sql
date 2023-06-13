CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY,
  date DATE,
  type VARCHAR(50),
  category VARCHAR(50),
  amount DECIMAL(10, 2),
  description VARCHAR(255)
);