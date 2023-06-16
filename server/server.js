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

//Request all transactions between two dates.
app.get("/transactions/", cors(corsOptions), async (req, res) => {
  const dateFrom = req.params.date1;
  const dateTo = req.params.date2;
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE DATE BETWEEN ? AND ?",
    [dateFrom, dateTo]
  );
  res.send(transactions);
});

//Request transactions for a specific date.
app.get("/transactions/:date", cors(corsOptions), async (req, res) => {
  const date = req.params.date;
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE DATE = ?",
    [date]
  );
  res.send(transactions);
});

//Request transactions by expenses
app.get("/transactions/expenses", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'expense'"
  );
  res.send(transactions);
});

//Request transactions by income....
app.get("/transactions/income", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'income'"
  );
  res.send(transactions);
});

//Add a transaction
app.post("/transaction/", cors(corsOptions), async (req, res) => {
  const { date, type, amount, description, category } = req.body;
  const [transactions] = await promisePool.query(
    "INSERT INTO transaction (date, type, amount, description, category_id) VALUES (?, ?, ?, ?, ?)",
    [date, type, amount, description, category]
  );
  res.send(transactions);
});

//Delete a transaction
app.delete("/transaction/:id", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
  const [transactions] = await promisePool.query(
    "DELETE FROM transaction WHERE transaction_id = ?",
    [id]
  );
  res.send(transactions);
});

//Update a transaction.....
app.put("/transaction/:id", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
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
  const description = req.params.description;
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
//Get total expenses....
app.get("/expenses", cors(corsOptions), async (req, res) => {
  const [expenses] = await promisePool.query(
    "SELECT SUM(amount) FROM transaction WHERE type = 'expense'"
  );
  res.send(expenses);
});

//get total income....
app.get("/income", cors(corsOptions), async (req, res) => {
  const [income] = await promisePool.query(
    "SELECT SUM(amount) FROM transaction WHERE type = 'income'"
  );
  res.send(income);
});

//Get total income by category.....Tested in Portman
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
app.get("/expensebycategory", cors(corsOptions), async (req, res) => {
  const [expensebycategory] = await promisePool.query(
    `SELECT c.category_id, c.category_name, SUM(t.amount) AS total_amount
    FROM transaction t
    JOIN category c ON t.category_id = c.category_id
    WHERE t.type = 'expense'
    GROUP BY c.category_id, c.category_name
    ORDER BY total_amount;`
  );
  console.log(expensebycategory);
  res.send(expensebycategory);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
