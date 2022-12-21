const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  database: "db",
  user: "root",
  password: "root",
});
// pool.connect(()=>{
//     console.log("connected")
// })

module.exports = pool.promise();
