const sequelize = require("sequelize");

//connect to database auth
const db = new sequelize("exampledb", "root", "", {
  dialect: "mysql",
});

module.exports = db;
