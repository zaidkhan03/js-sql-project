const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

app.post("/submit", (req, res) => {
  const { firstName, lastName, grade, dob, parentName, address, phone, email } =
    req.body;

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
});

app.listen(3005, () => {
  console.log(`Server running at http://localhost:3005`);
});
