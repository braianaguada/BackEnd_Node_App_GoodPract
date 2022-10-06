const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//!ACA DEBO PASAR EL OBJETO USUARIO
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {//!TOKENIZO ESTAS 2 PROPIEDADES
      _id: user._id,
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
