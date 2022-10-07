const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const {getProperties} = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

//!ACA DEBO PASAR EL OBJETO USUARIO
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {//!TOKENIZO ESTAS 2 PROPIEDADES
      //_id: user._id, //!ESTA PROPIEDAD LA VUELVO DINAMICA PARA QUE CAMBIE DE ACUERDO A SI LA BASE DE DATOS ES SQL O NOSQL
      [propertiesKey.id] : user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      //!COMO 3° ARGUMENTO PUEDO PASAR OPCIONALMENTE EL TIEMPO EN QUE QUIERO QUE VENZA EL TOKEN
      expiresIn: "2h",
    }
  );
  return sign;
};

//!ACA DEBO PASAR EL TOKEN DE SESION, EL JWT
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null; //!POR SI ALGO ROMPE
  }
};

module.exports = {
  tokenSign,
  verifyToken,
};
