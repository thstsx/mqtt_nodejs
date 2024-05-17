const express = require("express");
const app = express();
const port = 3000;

// --------------------------

// Serve static files
app.use(express.static("public"));
app.use("/assets", express.static("public"));

// =================================================================================
// API
const appApi = express();
const portApi = 30033;
const cors = require("cors");

const api = require("./api");
appApi.use("/api", api);
appApi.use(express.json());
appApi.use(cors());

//const bodyParser = require("body-parser"); // Import body-parser middleware
//const MQTTService = require('./v1/service/mqttService');
// appApi.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// appApi.use(bodyParser.json());
// const mqttService = new MQTTService('ws://192.168.0.108:9001', handleMessage);

// // Connect to MQTT broker
// mqttService.connect();

// // Handle MQTT message callback
// function handleMessage(topic, message) {
//     console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
//     // Additional logic to handle MQTT message if needed
// }

// // POST Subscribe to MQTT topic
// appApi.post('/api/v1/subscribe', (req, res) => {
//     const { topic } = req.body; // Destructure topic from request body
//     if (!topic) {
//         return res.status(400).json({ error: 'Topic is required' });
//     }
//     mqttService.subscribe(topic);
//     res.status(200).json({ message: 'Successfully subscribed to topic' });
// });

// // POST Unsubscribe from MQTT topic
// appApi.post('/api/v1/unsubscribe', (req, res) => {
//     const { topic } = req.body; // Destructure topic from request body
//     if (!topic) {
//         return res.status(400).json({ error: 'Topic is required' });
//     }
//     mqttService.unsubscribe(topic);
//     res.status(200).json({ message: 'Successfully unsubscribed from topic' });
// });

// // GET MQTT Connection Status
// appApi.get('/api/v1/connection-status', (req, res) => {
//     const connected = mqttService.isConnected();
//     res.json({ connected });
// });


// -----------------------------------------------------------------------------------------------------
const swaggerUi = require('swagger-ui-express');
//const { specs } = require('./swagger/swagger');
const specs = require('./swagger/swagger');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
const swaggerRouter = swaggerUi.serve;

// Define a simple API endpoint
// appApi.get('/api/v1/subscriber', (req, res) => {
//   res.send('This is the subscriber endpoint in API version 1');
// });




// Serve Swagger UI
//appApi.use('/api-docs', swaggerUi.serve);
//appApi.get('/api-docs', swaggerUi.setup(specs));
appApi.get('/api-docs', swaggerUi.setup(swaggerDocument));
appApi.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// appApi.get("/", (req, res) => {
//   res.send("Welcome to the MQTT API!");
// });

// Start the server
appApi.listen(portApi, () => {
  console.log(`Server listening on port ${portApi}`);
});
// ---------------------------------------------------------------
// Swagger UI
//const swaggerRouter = require('./swagger/swagger');
//app.use('/api-docs', swaggerRouter);
//app.use('/api-docs', swaggerRouter, swaggerUi.setup(swaggerDocument));

// ====================================================================================

// Template view engine
app.set("view engine", "ejs");

// Set the json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const subscriberRouter = require("./routes/subscriber");
const publisherRouter = require("./routes/publisher");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/subscriber", subscriberRouter);
app.use("/publisher", publisherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
