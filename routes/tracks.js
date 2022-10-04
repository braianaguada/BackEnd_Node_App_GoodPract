const express = require("express");
const router = express.Router();
const { validatorCreateItem } = require("../validators/tracks")
const { getItem, getItems, createItem } = require("../controllers/tracks");

router.get("/:id", getItem);
router.get("/", getItems);
router.post("/", validatorCreateItem, createItem);

module.exports = router;
