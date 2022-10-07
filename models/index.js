const ENGINE_DB = process.env.ENGINE_DB

//*DEBO VOLVER LAS RUTAS DINAMICAS PARA QUE ME CARGUE LOS MODELOS SQL O NOSQL DEPENDIENDO LA BASE DE DATOS CON LA QUE TRBAJE
const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql"


const models = {
  usersModel: require(`${pathModels}/user`),
  tracksModel: require(`${pathModels}/tracks`),
  storageModel: require(`${pathModels}/storage`),
};//! ADMINISTRO MODELOS NOSQL 
  //*O AHORA TAMBIEN SQL

module.exports = models;
