// // swagger.js
// const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const router = express.Router();

// // Swagger options
// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'MQTT API',
//       version: '1.0.0',
//       description: 'MQTT API',
//     },
//   },
//   apis: ['./../api/v1/subscriber/*.js'],
// };
// //,'./../api/v1/publisher/*.js'
// // apis: ["./healthcheck/*.js", "./api/*.js", "./api/v1/devices/*.js", "./api/v1/devices/controls/*.js", "./api/v1/simulators/*.js"], //Swagger 파일 연동

// const specs = swaggerJsdoc(options);

// // Serve Swagger UI
// // router.use('/', swaggerUi.serve);
// // router.get('/', swaggerUi.setup(specs));

// // module.exports = router;

// // ----------------------------
// // module.exports = {
// // 	swaggerUi,
// // 	specs,
// // }


// // Example
// router.use('/', swaggerUi.serve);
// router.get('/', swaggerUi.setup(specs));

// // Define the endpoint to check MQTT connection status
// router.get('/connection-status', (req, res) => {
//     // Logic to check MQTT connection status
//     // For now, let's assume it's connected
//     const connected = true;

//     res.status(200).json({ connected });
// });

// module.exports = router;
// ===========================
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const router = express.Router();

// Swagger options
const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'MQTT API',
      version: '2.0',
      description: 'MQTT API',
    },
  },
  apis: ['./../api/v1/subscriber/*.js'],
};



const specs = swaggerJsdoc(options);

// Serve Swagger UI
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

// Define the endpoint to check MQTT connection status
router.get('/connection-status', (req, res) => {
    // Logic to check MQTT connection status
    // For now, let's assume it's connected
    const connected = true;

    res.status(200).json({ connected });
});

module.exports = router;
