const express = require("express");
const router = express.Router();
const { customHeader } = require("../middleware/customHeader");
const { checkRol } = require("../middleware/rol");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const {
  getItem,
  getItems,
  createItem,
  updateItems,
  deleteItems,
} = require("../controllers/tracks");
const { authMiddleware } = require("../middleware/session");

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin", "user"]),
  validatorCreateItem,
  createItem
);  //!checkRol DEBE IR SIEMPRE DESPUES DE authMiddleware YA QUE LA PERSONA DEBE EXISTIR SI O SI
    //!ADEMAS DENTRO DE checkRol MANDO UN ARRAY CON LOS ROLES PERMITIDOS
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItems
);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItems);

module.exports = router;
