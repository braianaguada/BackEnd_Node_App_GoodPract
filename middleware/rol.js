const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => async (req, res, next) => {
  try {
    const { user } = req; //!ESTO GRACIAS AL ADICIONAL DEL MIDDLEWARE authMiddleware
    const rolesByUser = user.role;
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    ); //!DEVUELVE TRUE O FALSE DEPENDIENDO DE SI CHECKEA LA PROPIEDAD DE checkRol PASADA EN LA RUTA
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = { checkRol };
