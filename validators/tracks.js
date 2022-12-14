const { check } = require("express-validator"); //!CHEQUEA DATOS PARA HACER LAS VALIDACIONES ANTES DE QUE ESTOS LLEGUEN A LOS CONTROLLERS
const validateResults = require("../utils/handleValidator");
//! EXPRES VALIDATOR NOS BRINDA LAS VALIDACIONES

const validatorCreateItem = [
  //! MIDDLEWARE
  check("name").exists().notEmpty(),
  check("album").exists().notEmpty(),
  check("cover").exists().notEmpty(),
  check("artist").exists().notEmpty(),
  check("artist.name").exists().notEmpty(),
  check("artist.nickname").exists().notEmpty(),
  check("artist.nationality").exists().notEmpty(),
  check("duration").exists().notEmpty(),
  check("duration.start").exists().notEmpty(),
  check("duration.end").exists().notEmpty(),
  check("mediaId").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItem = [
  //! MIDDLEWARE
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {validatorCreateItem, validatorGetItem}
