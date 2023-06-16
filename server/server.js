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

//Request all transactions between two dates.....
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

//Request transactions for a specific date.......
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

//Request transactions by expenses.......
//Format.....http://localhost:5000/expense_transactions
app.get("/expense_transactions", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'expense'"
  );
  res.send(transactions);
});

//Request transactions by income....
//Format..........http://localhost:5000/income_transactions
app.get("/income_transactions", cors(corsOptions), async (req, res) => {
  const [transactions] = await promisePool.query(
    "SELECT * FROM transaction WHERE type = 'income'"
  );
  res.send(transactions);
});

//Add a transaction.......
//Format............http://localhost:5000/add_transaction/
app.post("/add_transaction/", cors(corsOptions), async (req, res) => {
  const { date, type, amount, description, category_name } = req.body;
  // console.log("req.body", req.body);
  // console.log(category_name);
  const [transactions] = await promisePool.query(
    `INSERT INTO transaction 
  (date, type, amount, description, category_name) VALUES (?, ?, ?, ?, ?)`,
    [date, type, amount, description, category_name]
  );

  res.send(transactions);
});

//Delete a transaction....
//Format.....http://localhost:5000/delete_transaction/11
app.delete("/delete_transaction/:id", cors(corsOptions), async (req, res) => {
  const id = req.params.id;
  const [transactions] = await promisePool.query(
    "DELETE FROM transaction WHERE transaction_id = ?",
    [id]
  );
  res.send(transactions);
});

//Update a transaction.....
//Format...........http://localhost:5000/update_transaction/11
app.put("/update_transaction/:id", cors(corsOptions), async (req, res) => {
  const trans_id = req.params.id;
  //console.log(trans_id);
  const { date, type, amount, description, category } = req.body;
  //console.log(req.body);
  console.log(category);
  const [transactions] = await promisePool.query(
    `UPDATE transaction SET date = ?, type = ?,
    amount = ?, description = ?, category_name = ? WHERE transaction_id = ?`,
    [date, type, amount, description, category, trans_id]
  );
  console.log(transactions);
  res.send(transactions);
});

//Update or Add a description....
//Format....http://localhost:5000/update_description/11/Tesla Stock
app.put(
  "/update_description/:id/:description",
  cors(corsOptions),
  async (req, res) => {
    const id = req.params.id;
    const description = req.params.description;
    const [descriptionUpdate] = await promisePool.query(
      "UPDATE transaction SET description = ? WHERE transaction_id = ?",
      [description, id]
    );
    res.send(descriptionUpdate);
  }
);

//Update type Expense or Income....If we use, we must select the ranges of
//caregories that can be used in the front-end........
app.put("/update_type/:id", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  const [typeUpdate] = await promisePool.query(
    "UPDATE transaction SET type = ? WHERE transaction_id = ?",
    [type, id]
  );

  res.send(typeUpdate);
});
//Get total expenses....
//Format......http://localhost:5000/expenses
app.get("/expenses", cors(corsOptions), async (req, res) => {
  const [expenses] = await promisePool.query(
    "SELECT SUM(amount) FROM transaction WHERE type = 'expense'"
  );
  res.send(expenses);
});

//get total income....
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
    `SELECT category_name, SUM(amount) AS total_amount
    FROM transaction
    WHERE type = 'income'
    GROUP BY category_name
    ORDER BY total_amount;`
  );
  res.send(incomebycategory);
});

//Get total expenses by category.....Tested in Portman
//Format...........http://localhost:5000/expensebycategory
app.get("/expensebycategory", cors(corsOptions), async (req, res) => {
  const [expensebycategory] = await promisePool.query(
    `SELECT category_name, SUM(amount) AS total_amount
    FROM transaction
    WHERE type = 'expense'
    GROUP BY category_name
    ORDER BY total_amount;`
  );
  res.send(expensebycategory);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
