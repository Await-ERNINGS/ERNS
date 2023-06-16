const mysql = require('mysql2')


exports.promisePool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1230",
    database: "ern$",
  })
  .promise();
