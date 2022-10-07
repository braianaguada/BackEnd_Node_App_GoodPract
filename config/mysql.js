const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

//!INSTANCIO LA CLASE QUE HACE LA CONEXION
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

//!CONEXION A LA BASE DE DATOS MYSQL
const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("**CONECTADO A LA BASE DE DATOS SQL**");
  } catch (error) {
    console.log("**NO SE PUDO CONECTAR A LA BASE DE DATOS SQL**", error);
  }
};

module.exports = { sequelize, dbConnectMySql };
