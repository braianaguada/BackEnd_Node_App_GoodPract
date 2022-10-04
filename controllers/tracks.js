const { tracksModel } = require("../models");

const getItem = () => {};

const getItems = async (req, res) => {
  const data = await tracksModel.find({});
  res.send({ data });
};

const createItem = async (req, res) => {
const {body} = req
const data = await tracksModel.create(body)
res.send({data})
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
