const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const pass =process.env.DB_PASS;
console.log(pass)

const db = mysql.createConnection({
  host:'localhost',
  user:'root', 
  password: process.env.DB_PASS,
  database: 'school_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Successfully connected with the DB');
});

module.exports = db;