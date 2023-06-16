const mysql = require("mysql2");

exports.promisePool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Whddnjs92!",
    database: "ern$",
  })
  .promise();
