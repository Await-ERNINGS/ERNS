CREATE TABLE user_credentials (
  user_id INT AUTO_INCREMENT PRIMARY KEY ,
  username VARCHAR(50),
  transaction_id INT,
  FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id)
);

-- Populate table user_credentials
INSERT INTO user_credentials (username, transaction_id)
VALUES
  ('EfficiencyMarriesEfficacy', 1),
  ('EfficiencyMarriesEfficacy', 2),
  ('EfficiencyMarriesEfficacy', 3),
  ('EfficiencyMarriesEfficacy', 4),
  ('EfficiencyMarriesEfficacy', 5),
  ('EfficiencyMarriesEfficacy', 6),
  ('EfficiencyMarriesEfficacy', 7),
  ('EfficiencyMarriesEfficacy', 8),
  ('EfficiencyMarriesEfficacy', 9),
  ('EfficiencyMarriesEfficacy', 10);