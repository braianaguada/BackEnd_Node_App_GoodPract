const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      //!VERIFICO QUE EL TOKEN EXISTA EN LOS HEADERS
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token); //!VERIFICO QUE EL TOKEN SEA EL CORRECTO

    if (!dataToken._id) {
      //!VERIFICO QUE LA ID DENTRO DEL TOKEN SEA LA CORRESPONDIENTE
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    //?????????????????????ADICIONAL?????????????????????????????
    //! SI QUIERO TENER INFO PARA PODER LLEVAR UN REGISTRO DE QUIEN ESTA CONSUMIENTO EL TOKEN
    const user = await usersModel.findById(dataToken._id); //!BUSCO EL USER
    req.user = user; //!INSERTO EN LA PETICION QUE ESTOY HACIENDO LOS DATOS DEL USER
    //???????????????????????????????????????????????????????????

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = { authMiddleware };
