const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItem, getItems, createItem, updateItems, deleteItems } = require("../controllers/tracks");


router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItems);
router.delete("/:id", validatorGetItem, deleteItems);

module.exports = router;
