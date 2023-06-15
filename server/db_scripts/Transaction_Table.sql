CREATE TABLE transaction (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  type VARCHAR(50),
  category_id INT,
  description VARCHAR(255),
  amount DECIMAL(10,2),
  FOREIGN KEY (category_id) REFERENCES category(category_id)
);
  INSERT INTO transaction (date, type, category_id, description, amount)
  VALUES
      ('2023-06-01', 'Expense', 11, 'Rent payment', 1200.00),
      ('2023-06-02', 'Income', 1, 'MMC', 3000.00),
      ('2023-06-03', 'Expense', 12, 'Whole Foods', 150.50),
      ('2023-06-04', 'Expense', 15, 'Chez Paris', 50.00),
      ('2023-06-05', 'Expense', 14, 'Utility bills', 80.00),
      ('2023-06-06', 'Income', 2, 'Google', 500.00),
      ('2023-06-07', 'Expense', 20, 'Shoes', 200.00),
      ('2023-06-08', 'Expense', 13, 'Fuel expenses', 60.00),
      ('2023-06-09', 'Expense', 18, 'Movie tickets', 25.00),
      ('2023-06-10', 'Income', 3, 'Apple', 700.00);
