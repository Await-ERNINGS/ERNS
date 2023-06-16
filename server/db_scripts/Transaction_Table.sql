CREATE TABLE transaction (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  type VARCHAR(50),
  category_name VARCHAR(50),
  description VARCHAR(255),
  amount DECIMAL(10,2)
);

-- Populate Transaction Table
INSERT INTO transaction (date, type, category_name, description, amount)
VALUES
  ('2023-06-01', 'Expense', 'Rent/Mortgage', 'Rent payment', 1200.00),
  ('2023-06-02', 'Income', 'Employment', 'MMC', 3000.00),
  ('2023-06-03', 'Expense', 'Groceries', 'Whole Foods', 150.50),
  ('2023-06-04', 'Expense', 'Dining Out', 'Chez Paris', 50.00),
  ('2023-06-05', 'Expense', 'Utilities', 'Utility bills', 80.00),
  ('2023-06-06', 'Income', 'Investments', 'Google', 500.00),
  ('2023-06-07', 'Expense', 'Shopping', 'Shoes', 200.00),
  ('2023-06-08', 'Expense', 'Transportation', 'Fuel expenses', 60.00),
  ('2023-06-09', 'Expense', 'Entertainment', 'Movie tickets', 25.00),
  ('2023-06-10', 'Income', 'Dividends', 'Apple', 700.00);
