const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const pass =process.env.DB_PASS;
console.log(pass)

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Successfully connected with the DB');
});

module.exports = db;