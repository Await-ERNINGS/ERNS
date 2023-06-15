CREATE TABLE category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50)
);
  
  INSERT INTO category (category_name) 
  VALUES
  --Income
  ("Income - Employment "),               --1
  ("Income - Investment"),                --2
  ("Income - Dividends"),                 --3
  ("Income - Royalties"),                 --4
  ("Income - Rental"),                    --5
  ("Income - Retirement"),                --6 
  ("Income - Government Assistance"),     --7
  ("Income - Gifts and Inheritance"),     --8
  ("Income - Self-employment"),           --9
  ("Income - Other"),                     --10
  
  --Expenses
  ("Rent/Mortgage"),                      --11
  ("Groceries"),                          --12
  ("Transportation"),                     --13
  ("Utilities"),                          --14
  ("Dining Out"),                         --15
  ("Insurance"),                          --16
  ("Education"),                          --17
  ("Entertainment"),                      --18
  ("Travel"),                             --19
  ("Shopping"),                           --20
  ("Home Maintenance"),                   --21
  ("Personal Care"),                      --22
  ("Debt Payments"),                      --23
  ("Subscriptions"),                      --24
  ("Charitable Donations"),               --25
  ("Taxes"),                              --26
  ("Miscellaneous");                      --27
