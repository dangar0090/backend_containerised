const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.USR,
  password: process.env.PASSWD,
  host: process.env.HOST,
  database: process.env.DB,
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const name = req.body.name;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE name = ?",
    [wage, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//
app.delete("/delete/:name", (req, res) => {
  const id = req.params.name;
  db.query("DELETE FROM employees WHERE name = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {                               
  console.log("Yay, your server is running on port 5000");
});
