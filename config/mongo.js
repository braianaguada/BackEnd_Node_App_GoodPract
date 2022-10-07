const mongoose = require("mongoose")
//!CONFIGURACION DE CONEXION A BASE DE DATOS
const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, res) => {
        if(!err){
            console.log('**CONECTADO A LA BASE DE DATOS NOSQL**');
        }else{
            console.log('**NO SE PUDO CONECTAR A LA BASE DE DATOS NOSQL**');
        }
    })
}

module.exports = dbConnect