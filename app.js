require("dotenv").config(); //! USO ARCHIVO CON VARIABLES DE ENTORNO (INSTALAR DOTENV)
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");
const { swaggerDocs } = require("./docs/swagger");
const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json()); //!ME PERMITE CAPTURAR LOS OBJETOS DE LAS RUTAS
app.use(express.static("storage")); //! ME PERMITE USAR LOS ARCHIVOS SUBIDOS AL STORAGE, EN EL SERVIDOR

const port = process.env.PORT || 3000;

app.use("/api", require("./routes")); //! LLAMO LAS RUTAS

app.listen(port, () => {
  console.log(`**CONECTADO AL SERVIDOR, EN EL PUERTO: ${port}**`); //! CONEXION A SERVIDOR
  swaggerDocs(app, port); //!DOCUMENTACION
});

//! CONEXION A LA(S) BASE(S) DE DATOS

// ENGINE_DB === "nosql" ? dbConnectNoSql() : dbConnectMySql();
dbConnectNoSql()

//? Scaffold (Modelo Vista-Controlador(MVC)) - Estructura de carpetas
