const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mysql = require("mysql2");
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "db",
  user: "akatsuka",
  password: "example",
  database: "accounts",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
      return;
    }
    if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
