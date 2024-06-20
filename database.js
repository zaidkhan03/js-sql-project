const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

// Function to check and create the database if it doesn't exist
const ensureDatabaseExists = (dbName) => {
  return new Promise((resolve, reject) => {
    pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        pool.query(`USE ${dbName}`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

// Function to check and create the table if it doesn't exist
const ensureTableExists = (tableName) => {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        grade VARCHAR(10) NOT NULL,
        dob DATE NOT NULL,
        parentName VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL
      )`;
    pool.query(createTableQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// API endpoint to handle form submissions
app.post("/submit", async (req, res) => {
  try {
    await ensureDatabaseExists("students");
    await ensureTableExists("students");

    const {
      firstName,
      lastName,
      grade,
      dob,
      parentName,
      address,
      phone,
      email,
    } = req.body;

    const checkQuery = `SELECT * FROM students WHERE email = ? OR phone = ?`;
    pool.query(checkQuery, [email, phone], (err, results) => {
      if (err) {
        console.error("Error checking data:", err);
        res.status(500).send("Error checking data");
        return;
      }
      if (results.length > 0) {
        res.status(409).send("Email or phone number already in use");
        return;
      }

      const insertQuery = `INSERT INTO students (firstName, lastName, grade, dob, parentName, address, phone, email) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      pool.query(
        insertQuery,
        [firstName, lastName, grade, dob, parentName, address, phone, email],
        (err, results) => {
          if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error saving data");
            return;
          }
          res.status(200).send("Form data saved to database");
        }
      );
    });
  } catch (err) {
    console.error("Error ensuring database and table:", err);
    res.status(500).send("Error ensuring database and table");
  }
});

app.listen(3005, () => {
  console.log(`Server running at http://localhost:3005`);
});
