const express = require("express");
const router = express.Router();
const { getItem, getItems, createItem } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");

router.post("/", uploadMiddleware.single("myfile"), createItem); //! SINGLE ME AGARRA UN SOLO ARCHIVO SUBIDO, SI SUBO VARIOS USO MULTI("ACA DENTRO VA EL NOMBRE DE LA PROPIEDAD DE POSTMAN")

module.exports = router;
