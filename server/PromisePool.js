
const mysql = require("mysql2");


exports.promisePool = mysql.createPool (
{
        host:       'localhost',
        user:       'root',
        password:   '1230',
        database:   'ern$'
    }).promise();


