const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mysql = require("mysql2");
const promisePool = require("./PromisePool").promisePool;
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/express_backend", cors(corsOptions), (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

//test connection
app.get("/test", cors(corsOptions), async (req, res) => {
  const [test] = await promisePool.query("SELECT * FROM transaction");
  res.send(test);
});

//Request all transactions between two dates.....Tested in Portman
//Format......http://localhost:5000/transactions/?date1=2023-06-01&date2=2023-06-31
app.get("/transactions/", cors(corsOptions), async (req, res) => {
  const dateFrom = new Date(req.query.date1);
  const dateTo = new Date(req.query.date2);
  console.log(dateTo);
  console.log(dateFrom);
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE DATE BETWEEN ? AND ?",
    [dateFrom, dateTo]
  );
  console.log(transactions);
  res.send([transactions]);
});

//Request transactions for a specific date.
//Format.....http://localhost:5000/transactions/2023-06-01
app.get("/transactions/:date", cors(corsOptions), async (req, res) => {
  const date = req.params.date;
  console.log(req.params.date);
  console.log(date);
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE DATE = ?",
    date
  );
  console.log(transactions);
  res.send(transactions);
});

//Request transactions by expenses.......Tested by Portman
//Format.....http://localhost:5000/expensetransactions
app.get("/expensetransactions", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'expense'"
  );
  res.send(transactions);
});

//Request transactions by income....Tested by Portman
//Format..........http://localhost:5000/incometransactions
app.get("/incometransactions", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'income'"
  );
  res.send(transactions);
});

//Add a transaction.......Tested in Portman
//Format............http://localhost:5000/addtransaction/
app.post("/addtransaction/", cors(corsOptions), async (req, res) => {
  const { date, type, amount, description, category } = req.body;
  console.log(req.body);
  console.log(category);
  const [categoryID] = await promisePool.query(
    "SELECT category_id FROM category WHERE category_name = ?",
    [category]
  );
  console.log(categoryID);  
  const cat_id = categoryID[0].category_id;
  const [transactions] = await promisePool.query(`INSERT INTO transaction 
  (date, type, amount, description, category_id) VALUES (?, ?, ?, ?, ?)`,
  [date, type, amount, description, cat_id]
  );
  res.send(transactions);
});

//Delete a transaction....Tested in Postman
//Format.....http://localhost:5000/deletetransaction/11
app.delete("/deletetransaction/:id", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
  const [transactions] = await promisePool.query(
    "DELETE FROM transaction WHERE transaction_id = ?",
    [id]
  );
  res.send(transactions);
});

//Update a transaction.....
app.put("/transaction/:id", cors(corsOptions), async (req, res) => {
  const id = req.body.id
  const { date, type, amount, description, category } = req.body;
  const [transactions] = await promisePool.query(
    "UPDATE transaction SET date = ?, type = ?, amount = ?, description = ?, category_id = ? WHERE transaction_id = ?",
    [date, type, amount, description, category, id]
  );
  res.send(transactions);
});

//Add a category.....
app.post("/category/", cors(corsOptions), async (req, res) => {
  const name = req.body.name;
  const [categories] = await promisePool.query(
    "INSERT INTO category (category_name) VALUES (?)",
    name
  );
  res.send(categories);
});

//Delete a category....Tested in Portman
app.delete("/category/:id", cors(corsOptions), async (req, res) => {
  const { id } = req.params;
  const [category] = await promisePool.query(
    "DELETE FROM category WHERE category_id = ?",
    [id]
  );
  res.send(category);
});

//Update a category...
app.put("/category/:id/:name", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  console.log(name);
  const [categories] = await promisePool.query(
    "UPDATE category SET category_name = ? WHERE category_id = ?",
    [name, id]
  );
  res.send(categories);
});

//Update or Add a description....
app.put("/description/:id", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const [descriptionUpdate] = await promisePool.query(
    "UPDATE transaction SET description = ? WHERE transaction_id = ?",
    [description, id]
  );
  res.send(descriptionUpdate);
});

//Update type Expense or Income....
app.put("/type/", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const [typeUpdate] = await promisePool.query(
    "UPDATE transaction SET type = ? WHERE transaction_id = ?",
    [type, id]
  );
  res.send(typeUpdate);
});
//Get total expenses....Tested in Postman
//Format......http://localhost:5000/expenses
app.get("/expenses", cors(corsOptions), async (req, res) => {
  const [expenses] = await promisePool.query(
    "SELECT SUM(amount) FROM transaction WHERE type = 'expense'"
  );
  res.send(expenses);
});

//get total income....Tested in Postman
//Format.....http://localhost:5000/income
app.get("/income", cors(corsOptions), async (req, res) => {
  const [income] = await promisePool.query(
    "SELECT SUM(amount) FROM transaction WHERE type = 'income'"
  );
  res.send(income);
});

//Get total income by category.....Tested in Portman
//Format..........http://localhost:5000/incomebycategory
app.get("/incomebycategory", cors(corsOptions), async (req, res) => {
  const [incomebycategory] = await promisePool.query(
    `SELECT c.category_id, c.category_name, SUM(t.amount) AS total_amount
    FROM transaction t
    JOIN category c ON t.category_id = c.category_id
    WHERE t.type = 'income'
    GROUP BY c.category_id, c.category_name
    ORDER BY total_amount;`
  );

  res.send(incomebycategory);
});

//Get total expenses by category.....Tested in Portman
//Format...........http://localhost:5000/expensebycategory

app.get("/expensebycategory", cors(corsOptions), async (req, res) => {
  const [expensebycategory] = await promisePool.query(
    `SELECT c.category_id, c.category_name, SUM(t.amount) AS total_amount
    FROM transaction t
    JOIN category c ON t.category_id = c.category_id
    WHERE t.type = 'expense'
    GROUP BY c.category_id, c.category_name
    ORDER BY total_amount;`
  );

  res.send(expensebycategory);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
