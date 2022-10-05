const express = require("express");
const router = express.Router();
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { encrypt, compare } = require("../utils/handlePassword");

router.post("/register", validatorRegister, async (req, res) => {
  req = matchedData(req);
  const password = await encrypt(req.password);
  const body = { ...req, password };
  const data = await usersModel.create(body)
  data.set("password", undefined, {strict: false}) //!OCULTO LA PROPIEDAD PASSWORD EN LA RESPUESTA DEL SERVIDOR
  res.send({ data });
});

module.exports = router;
