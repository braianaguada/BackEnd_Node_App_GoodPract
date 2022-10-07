const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      select: false, //!PARA ESCONDER EL PASSWORD EN LA RESPUESTA DEL SERVIDOR
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User