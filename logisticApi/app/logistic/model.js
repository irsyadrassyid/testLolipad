const { DataTypes } = require("sequelize");
const db = require("../../database");

//create table User with sequelize
const Logistic = db.define(
  "logistic",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    logistic_name: { type: DataTypes.STRING },
    amount: {
      type: DataTypes.INTEGER,
    },
    destination_name: { type: DataTypes.STRING },
    origin_name: { type: DataTypes.STRING },
    duration: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Logistic;
