const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Full Stack Challenge API',
      version: '1.0.0',
      description: 'Documentación interactiva del backend del challenge',
    },
  },
  apis: ['./src/app.js'], // acá referenciamos los comentarios JSDoc en app.js
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
