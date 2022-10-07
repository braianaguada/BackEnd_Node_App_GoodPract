const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItem = async (req, res) => {
  try {
    req = matchedData(req); //!ESTA FUNCION LIMPIA LA DATA CON LAS VALIDACIONES ESTABLECIDAS POR MI Y DEJA PASAR LOS DATOS REQUERIDOS POR EL MODELO Y MIS VALIDACIONES
    const { id } = req;
    const data = await tracksModel.findOneData(id); //* CAMBIO METODO findById POR METODO PERSONALIZADO (findOneData)
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItems = async (req, res) => {
  try {
    const user = req.user; //!ESTO GRACIAS AL ADICIONAL DEL MIDDLEWARE authMiddleware
    const data = await tracksModel.findAllData({}); //* CAMBIO METODO find POR METODO PERSONALIZADO (findAllData)
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS"); //!PUEDO AGREGAR EL NUMERO DE ERROR QUE QUIERO CON UNA COMA DESPUES DE "ERROR_GET_ITEMS" O DEJAR EL QUE DI POR DEFECTO
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItems = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //!EXTRAIGO EL ID DEL REQ Y LO QUE QUEDA LO METE EN UNA CONST QUE SE LLAMA BODY
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItems = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id }); //!USO METODO DELETE(METODO DE MOONGOSE-DELETE(BORRADO LOGICO))
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItems,
  deleteItems,
};
