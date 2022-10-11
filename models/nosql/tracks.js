const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete"); //!PLUGIN PARA BORRADO LOGICO MONGO

/**
 * @openapi
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT 
 *   schemas:
 *     Tracks:
 *       type: object
 *       required:
 *        - name
 *        - album
 *        - cover
 *        - artist
 *        - duration
 *        - mediaId
 *       properties:
 *         id:
 *           type: uuid
 *           example: 633d11af6dcb6653cebd9458 
 *         name: 
 *           type: string
 *           example: Braian Aguada 
 *         album:
 *           type: string
 *           example: For Time
 *         cover:
 *           type: string
 *           example: https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg 
 *         artist: 
 *           type: object
 *           properties:
 *            name:
 *             type: string 
 *             example: Cesar Linkero 
 *            nickname:
 *             type: string 
 *             example: Cesar Linkero 
 *            nationality:
 *             type: string
 *             example: Arg
 *         duration: 
 *           type: object
 *           properties:
 *            start:
 *             type: number 
 *             example: 1 
 *            end:
 *             type: number 
 *             example: 15 
 *         mediaId:
 *           type: uuid
 *           example: 633d11af6dcb6653cebd9458 
 */

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },  
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//*IMPLEMENTO METODO PERSONALIZADO (ME LO PERMITE MONGOOSE) PARA RELACIONAR DOS MODELOS (RUTA getItems)

TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //!DESDE MODEL tracks relaciono con storages (Tracks --> Storages)
        localField: "mediaId", //!DEL MODEL tracks TOMO LA PROPIEDAD mediaId (Tracks.mediaId)
        foreignField: "_id", //! DEL MODEL storages TOMO LA PROPIEDAD _id (Storages._id)
        as: "audio", //!ALIAS
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

//*IMPLEMENTO METODO PERSONALIZADO (ME LO PERMITE MONGOOSE) PARA RELACIONAR DOS MODELOS (RUTA getItem)

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages", //!DESDE MODEL tracks relaciono con storages (Tracks --> Storages)
        localField: "mediaId", //!DEL MODEL tracks TOMO LA PROPIEDAD mediaId (Tracks.mediaId)
        foreignField: "_id", //! DEL MODEL storages TOMO LA PROPIEDAD _id (Storages._id)
        as: "audio", //!ALIAS
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

//!IMPLEMENTE MONGOOSE-DELETE(AGREGA LA PROPIEDAD delete:false AL MODELO)
TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" }); //!overrideMethods: ME PERMITE SOBRESCRIBIR LOS METODOS NATIVOS DE MOONGOSE CON LOS DEL SOFT DELETE O BORRADO LOGICO
module.exports = mongoose.model("tracks", TracksScheme);
