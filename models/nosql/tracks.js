const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete"); //!PLUGIN PARA BORRADO LOGICO MONGO

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
