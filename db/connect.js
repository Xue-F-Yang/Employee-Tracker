const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // Replace with your MySQL password
    database: 'employee_tracker'
  });

  module.exports = db;