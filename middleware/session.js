const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { getProperties } = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      //!VERIFICO QUE EL TOKEN EXISTA EN LOS HEADERS
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token); //!VERIFICO QUE EL TOKEN SEA EL CORRECTO

    // if (!dataToken._id) { //!PARA BASE DE DATOS NOSQL
    //   //!VERIFICO QUE LA ID DENTRO DEL TOKEN SEA LA CORRESPONDIENTE
    //   handleHttpError(res, "ERROR_ID_TOKEN", 401);
    //   return;
    // }
    //??????????????????????????????????????????
    //!COMO AHORA USO 2 BASES DE DATOS (SQL Y NOSQL)
    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    //??????????????????????????????????????????

    //*MODIFICO DE FORMA DINAMICA ID DE ACUERDO A SI LA BASE DE DATOS ES SQL O NOSQL
    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    //?????????????????????ADICIONAL?????????????????????????????
    //************************ADICIONAL PARA SQL Y NO SQL AL MISMO TIEMPO ****************
    //! SI QUIERO TENER INFO PARA PODER LLEVAR UN REGISTRO DE QUIEN ESTA CONSUMIENTO EL TOKEN
    const user = await usersModel.findOne({ query }); //!BUSCO EL USER
    //*CAMBIO METODO DE findById A findOne COMUN A MONGOOSE Y SEQUELIZE
    req.user = user; //!INSERTO EN LA PETICION QUE ESTOY HACIENDO LOS DATOS DEL USER
    //???????????????????????????????????????????????????????????

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = { authMiddleware };
