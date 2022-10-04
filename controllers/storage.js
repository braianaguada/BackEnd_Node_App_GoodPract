const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;

const getItem = () => {};

const getItems = async (req, res) => {};

const createItem = async (req, res) => {
  const { body, file } = req;

  const fileData = {
    //!ACA GUARDO EL ARCHIVO SUBIDO Y DEVUELVO UN LINK AL ARCHIVO YA SUBIDO
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const data = await storageModel.create(fileData);
  res.send({ data });
};

const updateItems = () => {};

const deleteItems = () => {};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItems,
  deleteItems,
};
