require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_grades_db',
  ssl: process.env.DB_SSL === 'true' ? { 
    rejectUnauthorized: true,
    ca: require('fs').readFileSync(require('path').join(__dirname, '../database/ca.pem'))
  } : false,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();
