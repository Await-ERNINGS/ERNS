
const mysql = require("mysql2");


exports.promisePool = mysql.createPool (
{
        host:       'localhost',
        user:       'root',
        password:   'XXXXXXXX',
        database:   'ern$'
    }).promise();


