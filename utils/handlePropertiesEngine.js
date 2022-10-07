const ENGINE_DB = process.env.ENGINE_DB

//!MIDDLEWARE PARA NORMALIZAR LAS PROPIEDADES DE LOS MODELOS SQL Y NOSQL

const getProperties = () => {
    const data = {
        nosql:{
            id:"_id"
        },
        mysql:{
            id:"id"
        }
    }
    return data[ENGINE_DB] //!DESTRUCTURIN
}

module.exports = {getProperties}