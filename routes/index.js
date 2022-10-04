const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (filename) => {
  return filename.split(".").shift();
}; //!ELIMINO EXTENSION .JS DE ARCHIVOS DENTRO DE CARPETA routes

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`));
  }
}); //! LEO ARCHIVOS DENTRO DE CARPETA routes DE MANERA ASINCRONA y AGREGA AL FINAL
//! DEL NOMBRE DE LA RUTA EL NOMBRE DEL ARCHIVO CORRESPONDIENTE, ej: http://localhost:3001/api/nombredelarchivo
//! ES DECIR HACE LA CARGA DINAMICA DE LA RUTA CON SU CONTROLADOR

module.exports = router;
