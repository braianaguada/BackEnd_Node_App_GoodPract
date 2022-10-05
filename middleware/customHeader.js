const customHeader = (req, res, next) => {
  //!MIDDLEWARE PARA LEER ALGUN ENCABEZADO DEL HEADER CUSTOMIZADO O NO (CUSTOMHEADER)
  try {
    //!EJEMPLO DE PRUEBA
    const apiKey = req.headers.api_key;
    if (apiKey === "braianaguada") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Api_key no es correcta" });
    }
  } catch (error) {
    res.status(403);
    res.send({ error: "Algo ocurrio en el custom header" });
  }
};

module.exports = customHeader;
