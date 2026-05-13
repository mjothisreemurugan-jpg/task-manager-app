const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "task_manager",
  "root",
  "84957800@Jothy",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;