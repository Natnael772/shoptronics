const mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  Storage: "./session.mysql",
});

// sequelize
//   .authenticate()
//   .then((res) => {
//     console.log("Connection established");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

module.exports = sequelize;
