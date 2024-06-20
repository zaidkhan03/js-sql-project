const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Use cors middleware

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

// API endpoint to handle form submissions
app.post("/submit", (req, res) => {
  const { firstName, lastName, grade, dob, parentName, address, phone, email } =
    req.body;

  const query = `INSERT INTO students (firstName, lastName, grade, dob, parentName, address, phone, email) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    query,
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

app.listen(3005, () => {
  console.log(`Server running at http://localhost:3005`);
});
