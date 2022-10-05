const { check } = require("express-validator"); //!CHEQUEA DATOS PARA HACER LAS VALIDACIONES ANTES DE QUE ESTOS LLEGUEN A LOS CONTROLLERS
const validateResults = require("../utils/handleValidator");
//! EXPRES VALIDATOR NOS BRINDA LAS VALIDACIONES

//!NO HACE FALTA VALIDADOR DE CREATE XQ YA LO HACE EL MIDDLEWARE DE MULTER

const validatorGetItem = [
  //! MIDDLEWARE
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {validatorGetItem}
