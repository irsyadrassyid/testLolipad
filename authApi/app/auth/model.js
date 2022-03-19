const { DataTypes } = require("sequelize");
const db = require("../../database/db");

//create table User with sequelize
const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlpha: true,
      },
    },
    msisdn: { type: DataTypes.BIGINT(15), unique: true },
    password: { type: DataTypes.STRING },
    token: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
