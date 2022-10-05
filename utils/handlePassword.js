const bcryptjs = require("bcryptjs");

const encrypt = async (passwordPlain) => {
  //! ENCRIPTA LA CONTRASEÑA, EN passwordPlain LE PASO LA CLAVE EN FORMATO PLANO
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  //!VERIFICA SI LA CLAVE CORRESPONDE AL HASH CORRESPONDIENTE
  //! DEBO PASARLE CONTRASEÑA SIN ENCRIPTAR Y CONTRASEÑA ENCRIPTADA
    return bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };
