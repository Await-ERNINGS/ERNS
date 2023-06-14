const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require(mysql2);
const { promisePool } = require("./PromisePool")
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/express_backend", cors(corsOptions), (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

//Request all transactions between two dates.
app.get('/transactions/', cors(corsOptions), async (req, res) => {
  const dateFrom = req.params.date1;
  const dateTo = req.params.date2;
  const [ transactions ] = await promisePool.query(
    "SELECT * FROM transactions WHERE DATE BETWEEN ? AND ?", 
    [dateFrom, dateTo]);
  res.send( transactions );
});