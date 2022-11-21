// const { createPool } = require("mysql");

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "db",
// });
// pool.query("SELECT * FROM STUDENT", (err, res) => {
//   console.log(res);
// });

// pool.query("insert into student values(1, 'NATO')", (err, res) => {
//   if (err) console.log(err);
//   console.log(res);
// });

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("use db", function (err, result) {
    if (err) throw err;
    console.log("Using database db");
  });
});
