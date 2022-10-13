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

/**
 * @openapi
 * /api/tracks:
 *   get:
 *     tags:
 *       - Tracks
 *     summary: "Get all tracks"
 *     description: Multiple properties must be provided separated by commas
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tracks"
 *       403:
 *         description: Error bringing all tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "ERROR_GET_ITEMS"
 *       402:
 *         description: Wrong token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_PAYLOAD_DATA"
 *       401:
 *         description: Not token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_TOKEN"
 */

router.get("/", authMiddleware, getItems);

/**
 * @openapi
 * /api/tracks/:id:
 *   get:
 *     tags:
 *       - Tracks
 *     summary: "Detail a track"
 *     description: Show information of a single track
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tracks"
 *       403:
 *         description: Failed to fetch track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "ERROR_GET_ITEM"
 *       402:
 *         description: Wrong token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_PAYLOAD_DATA"
 *       401:
 *         description: Not token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_TOKEN"
 */

router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**
 * @openapi
 * /api/tracks:
 *   post:
 *     tags:
 *       - Tracks
 *     summary: "Insert a track"
 *     description: Insert single track data
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tracks'
 *      required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tracks"
 *       403:
 *         description: Failed to insert track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "ERROR_INSERT_ITEM"
 *       402:
 *         description: Wrong token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_PAYLOAD_DATA"
 *       401:
 *         description: Not token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_TOKEN"
 */

router.post(
  "/",
  authMiddleware,
  checkRol(["admin", "user"]),
  validatorCreateItem,
  createItem
); //!checkRol DEBE IR SIEMPRE DESPUES DE authMiddleware YA QUE LA PERSONA DEBE EXISTIR SI O SI
//!ADEMAS DENTRO DE checkRol MANDO UN ARRAY CON LOS ROLES PERMITIDOS

/**
 * @openapi
 * /api/tracks/:id:
 *   put:
 *     tags:
 *       - Tracks
 *     summary: "Update a track"
 *     description: Update single track data
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tracks'
 *      required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tracks"
 *       403:
 *         description: Failed to update track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "ERROR_UPDATE_TRACK"
 *       402:
 *         description: Wrong token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_PAYLOAD_DATA"
 *       401:
 *         description: Not token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_TOKEN"
 */

router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItems
);

/**
 * @openapi
 * /api/tracks/:id:
 *   delete:
 *     tags:
 *       - Tracks
 *     summary: "Delete a track"
 *     description: Delete single track
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tracks'
 *      required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Tracks"
 *       403:
 *         description: Failed to delete track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "ERROR_DELETE_TRACK"
 *       402:
 *         description: Wrong token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_PAYLOAD_DATA"
 *       401:
 *         description: Not token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     error:
 *                       type: string
 *                       example: "NOT_TOKEN"
 */

router.delete("/:id", authMiddleware, validatorGetItem, deleteItems);

module.exports = router;
