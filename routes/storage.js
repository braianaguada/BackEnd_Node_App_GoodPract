const express = require("express");
const router = express.Router();
const { validatorGetItem } = require("../validators/storage");
const uploadMiddleware = require("../utils/handleStorage");
const {
  getItem,
  getItems,
  createItem,
  deleteItems,
} = require("../controllers/storage");

router.post("/", uploadMiddleware.single("myfile"), createItem); //! SINGLE ME AGARRA UN SOLO ARCHIVO SUBIDO, SI SUBO VARIOS USO MULTI("ACA DENTRO VA EL NOMBRE DE LA PROPIEDAD DE POSTMAN")
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItems);

module.exports = router;
