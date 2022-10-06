const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");

router.post("/register", validatorRegister, registerController);
router.post("/login", validatorLogin, loginController);

module.exports = router;
