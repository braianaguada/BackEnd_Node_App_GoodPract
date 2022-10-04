const multer = require("multer");
//! CONFIGURACION MIDDLEWARE DE ALMACENAMIENTO
//! MULTER ES LA LIBRERIA QUE ME PERMITE SUBIR ARCHIVOS
//! MULTER UTILIZA EL STORAGE COMO UN MIDDLEWARE(ESPECIE DE FUNCION QUE ESTA EN LA MITAD, ENTRE LA RUTA Y EL CONTROLADOR)

const storage = multer.diskStorage({ //!MIDDLEWARE
    destination: function (req, file, cb) {
      const pathStorage = `${__dirname}/../storage`; //!ACA SE VAN A GUARDAR LOS ARCHIVOS SUBIDOS
      cb(null, pathStorage); //! CB EN SU PRIMER VARIABLE MANEJA ERRORES Y EN LA SEGUNDA EL DESTINO DE LOS ARCHIVOS
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split(".").pop(); //! ACA TOMO LA EXTENSION DEL ARCHIVO SUBIDO
      const filename = `file-${Date.now()}.${ext}`; //! LE ASIGNA ESTE NOMBRE A LOS ARCHIVOS DE MANERA ALEATORIA DEBIDO A LA FUNCION Date.now()
      cb(null, filename);
    },
  });
  
  const uploadMiddleware = multer({ //!USO EL MIDDLEWARE
    storage,
  });

  module.exports = uploadMiddleware