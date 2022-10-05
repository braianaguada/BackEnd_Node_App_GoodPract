const { check } = require("express-validator"); //!CHEQUEA DATOS PARA HACER LAS VALIDACIONES ANTES DE QUE ESTOS LLEGUEN A LOS CONTROLLERS
const validateResults = require("../utils/handleValidator");
//! EXPRES VALIDATOR NOS BRINDA LAS VALIDACIONES

const validatorRegister = [
  //! MIDDLEWARE
  check("name").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("age").exists().notEmpty().isNumeric({ min: 10 }),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  //! MIDDLEWARE
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
