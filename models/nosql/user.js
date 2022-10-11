const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - age
 *        - email
 *        - password
 *       properties:
 *         id:
 *           type: uuid
 *           example: 633d11af6dcb6653cebd9458 
 *         name: 
 *           type: string
 *           example: Franco Segovia 
 *         age:
 *           type: number
 *           example: 27
 *         email:
 *           type: string
 *           format: email
 *           example: ejemplo@email.com 
 *         password: 
 *           type: string
 *           format: password
 *         role:
 *           type: enum
 *           default: [user, admin]
 *           example: user 
 */

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false //!PARA ESCONDER EL PASSWORD EN LA RESPUESTA DEL SERVIDOR
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme);
