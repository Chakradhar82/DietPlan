const mysql = require('mysql');

console.log(process.env.PASSWORD)
let connection = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    user: process.env.USER
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection

