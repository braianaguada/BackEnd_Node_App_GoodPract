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
//!IMPLEMENTE MONGOOSE-DELETE(AGREGA LA PROPIEDAD delete:false AL MODELO)
TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" }); //!overrideMethods: ME PERMITE SOBRESCRIBIR LOS METODOS NATIVOS DE MOONGOSE CON LOS DEL SOFT DELETE O BORRADO LOGICO
module.exports = mongoose.model("tracks", TracksScheme);
