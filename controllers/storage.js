const fs = require("fs");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`; //!__dirname: ES EL DIRECTORIO ACTUAL

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM"); //!PUEDO AGREGAR EL NUMERO DE ERROR QUE QUIERO CON UNA COMA DESPUES DE "ERROR_GET_ITEMS" O DEJAR EL QUE DI POR DEFECTO
  }
};

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS"); //!PUEDO AGREGAR EL NUMERO DE ERROR QUE QUIERO CON UNA COMA DESPUES DE "ERROR_GET_ITEMS" O DEJAR EL QUE DI POR DEFECTO
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      //!ACA GUARDO EL ARCHIVO SUBIDO Y DEVUELVO UN LINK AL ARCHIVO YA SUBIDO
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

//!UPDATEITEM PARA ARCHIVOS FISICOS MALA PRACTICA

const deleteItems = async (req, res) => {
  //!ESTE NO ES SOFT DELETE O BORRADO LOGICO
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne(id);
    const { filename } = dataFile; //! OBTENGO PROP FILENAME
    const filePath = `${MEDIA_PATH}/${filename}`; //!RUTA FINAL
    fs.unlinkSync(filePath); //! ELIMINA EL ARCHIVO FISICAMENTE DE LA RUTA ESPECIFICADA
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM"); //!PUEDO AGREGAR EL NUMERO DE ERROR QUE QUIERO CON UNA COMA DESPUES DE "ERROR_GET_ITEMS" O DEJAR EL QUE DI POR DEFECTO
  }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  deleteItems,
};
