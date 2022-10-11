const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

/**
 * @openapi
 * components:
 *   schemas:
 *     Storage:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           example: 633d11af6dcb6653cebd9458 
 *         url: 
 *           type: string
 *           example: http://localhost:3001/file-1665462251917.jpg 
 *         filename:
 *           type: string
 *           example: file-1665462251917.jpg
 */

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storages", StorageScheme);
