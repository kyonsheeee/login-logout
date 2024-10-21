const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const { Client } = require("pg");
const client = new Client({
  user: "akatsuka",
  host: "localhost",
  database: "accounts",
  port: 5432,
});

app.use(cors());
app.unsubscribe(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("accounts");

    const user = await db.findOne({ email, password });

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
