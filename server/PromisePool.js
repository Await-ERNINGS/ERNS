const mysql = require("mysql2");

exports.promisePool = mysql
  .createPool({
    host: "localhost",
    user: "root",

    password: "####",

    password: "#####",

    database: "ern$",
  })
  .promise();
