const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  definition:{
    openapi: "3.0.0",
    info: {
      title: "Documentation NodeJS APP",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.js", "models/nosql/*.js"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    }
  }
};

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
  app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}


module.exports = {swaggerDocs}
