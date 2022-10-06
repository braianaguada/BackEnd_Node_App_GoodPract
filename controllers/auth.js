const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { compare } = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false }); //!OCULTO LA PROPIEDAD PASSWORD EN LA RESPUESTA DEL SERVIDOR

    //!ACA APLICO EL TOKEN SOBRE EL USUARIO
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginController = async (req, res) => {
  try {
    req = matchedData(req); //!SIEMPRE EN ESTA PARTE LIMPIO LA DATA QUE ME LLEGA POR BODY PARA QUE NO ME MANDEN CUALQUIER DATO O DATOS QUE NO FIGURAN EN EL MODELO
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email"); //!CON .select ELIJO QUE PROPIEDADES MOSTRAR EN LA RESPUESTA
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
      return;
    }
    const hashPassword = user.get("password"); //!COMO OCULTE PASSWORD EN LA RESPUESTA NO PUEDO USAR user.password
    const check = await compare(req.password, hashPassword); //!VERIFICA QUE LA CONTRASEÑA INGRESADA POR EL USER SEA IGUAL A LA QUE SE ENCUENTRA HASHEADA EN LA BASE DE DATOS

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false }); //!VUELVO A OCULTAR EL PASSWORD EN LA RESPUESTA DEL SERVIDOR

    const data = {
      token: await tokenSign(user), //!GENERO TOKEN DE SESION
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerController, loginController };
