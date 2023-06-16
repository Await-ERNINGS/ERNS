
const mysql = require("mysql2");


exports.promisePool = mysql.createPool (
{
        host:       'localhost',
        user:       'root',
        password:   'XXXXXXX', //replace me
        database:   'ern$'
    }).promise();


