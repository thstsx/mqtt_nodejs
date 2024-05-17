// const express = require('express');
// const app = express();

// // Import routers for different versions/categories of your API
// const v1Router = require('./v1');

// // Mount routers
// app.use('/api/v1', v1Router);

// // Start the Express server
// const PORT = process.env.PORT || 30033;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

// module.exports = app;

//const router = require("express").Router();

//router.use("/v1/subscriber", require("./v1/subscriber"));
//router.use("/v1/publisher", require("./v1/publisher"));

//module.exports = router
const express = require("express");
const router = express.Router();
const subscriberRoutes = require('./v1/subscriber/index');
router.use('/v1/subscriber', subscriberRoutes);
//const MQTTService = require('./v1/service/mqttService');
// --------------------------------------------------------------



const MQTTService = require('./v1/service/mqttService');

const mqttService = new MQTTService('ws://192.168.0.108:9001');
// router.get('/connection-status', (req, res) => {
//     const connected = mqttService.isConnected();
//     res.json({ connected });
// });

mqttService.connect();

router.post('/v1/subscribe', (req, res) => {
    const { topic } = req.body;
    mqttService.subscribe(topic);
    res.status(200).json({ message: 'Successfully subscribed to topic' });
});

router.post('/v1/unsubscribe', (req, res) => {
    const { topic } = req.body;
    mqttService.unsubscribe(topic);
    res.status(200).json({ message: 'Successfully unsubscribed from topic' });
});

// router.get('/connection-status', (req, res) => {
//     // Define a variable to track whether MQTT is connected
//     let mqttConnected = false;

//     // Subscribe to the 'connect' event of the MQTT service
//     mqttService.on('connect', () => {
//         // Set mqttConnected to true when connected
//         mqttConnected = true;

//         // Send response code 200 to Swagger UI
//         res.status(200).send();

//         // Print "subscribed" if MQTT is connected (response code 200)
//         if (mqttConnected) {
//             console.log('subscribed');
//         }
//     });

//     // Check if MQTT is already connected
//     if (mqttService.isConnected()) {
//         // If already connected, send response code 200 immediately
//         res.status(200).send();

//         // Print "subscribed" if MQTT is connected (response code 200)
//         console.log('subscribed');
//     }
// });

router.get('/connection-status', (req, res) => {
    console.log('./v1/connection-status');
    // Call the connect method of the MQTT service and pass a callback function
    mqttService.connect((statusCode) => {
        // Check if the status code is 200 (successful connection)
        if (statusCode === 200) {
            // If connected, send "subscribed" response
            res.json({ status: "subscribed" });
        } else {
            // If not connected, send an error response
            res.status(500).json({ error: "MQTT connection failed" });
        }
    });
});


// router.get('/connection-status', (req, res) => {
//     const connected = mqttService.isConnected();
//     res.json({ connected });
// });

// router.get('/connection-status', async (req, res) => {
//     try {
//       // Check connection status with MQTT broker
//       const isConnected = await MQTTService.checkConnection();
      
//       // Return success response if connected
//       if (isConnected) {
//         return res.status(200).json({ connected: true });
//       } else {
//         // Return error response if not connected
//         return res.status(500).json({ error: 'No connection to MQTT broker' });
//       }
//     } catch (error) {
//       console.error('Error checking MQTT connection:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// router.get('/connection-status', (req, res) => {
//     // Check the connection status with the MQTT broker here
//     const connected = true; // Assuming you have some logic to determine the connection status
  
//     if (connected) {
//       // If connected, send a 200 OK response
//       res.status(200).json({ connected: true });
//     } else {
//       // If not connected, send a 500 Internal Server Error response
//       res.status(500).json({ connected: false });
//     }
// });

// //const mqttService = new MQTTService('ws://192.168.0.108:9001', handleMessage);

// // Connect to MQTT broker
// mqttService.connect();

// // Handle MQTT message callback
// function handleMessage(topic, message) {
//     console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
//     // Additional logic to handle MQTT message if needed
// }

// // POST Subscribe to MQTT topic
// router.post('/v1/subscribe', (req, res) => {
//     const { topic } = req.body;
//     mqttService.subscribe(topic);
//     res.status(200).json({ message: 'Successfully subscribed to topic' });
// });

// // POST Unsubscribe from MQTT topic
// router.post('/v1/unsubscribe', (req, res) => {
//     const { topic } = req.body;
//     mqttService.unsubscribe(topic);
//     res.status(200).json({ message: 'Successfully unsubscribed from topic' });
// });

  


// // Connect to MQTT broker
// mqttService.connect();
// // Handle MQTT message callback
// function handleMessage(topic, message) {
//     console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
//     // Additional logic to handle MQTT message if needed
//   }
  
//   // Subscribe to MQTT topic
//   router.post('/subscribe', (req, res) => {
//     const { topic } = req.body;
//     mqttService.subscribe(topic);
//     res.status(200).json({ message: 'Successfully subscribed to topic' });
//   });
  
//   // Unsubscribe from MQTT topic
//   router.post('/unsubscribe', (req, res) => {
//     const { topic } = req.body;
//     // Additional logic to handle MQTT unsubscribe if needed
//     res.status(200).json({ message: 'Successfully unsubscribed from topic' });
//   });


//   // GET Subscriber Data
// router.get("/", subscriberController.getSubscriberData);

// // POST Subscribe to MQTT topic
// router.post("/subscribe", subscriberController.subscribeToTopic);

// // POST Unsubscribe from MQTT topic
// router.post("/unsubscribe", subscriberController.unsubscribeFromTopic);

// const mqttService = new MQTTService('ws://192.168.0.108:9001', handleMessage);

// // Connect to MQTT broker
// mqttService.connect();

// // Handle MQTT message callback
// function handleMessage(topic, message) {
//     console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
//     // Additional logic to handle MQTT message if needed
// }

// // POST Subscribe to MQTT topic
// router.post('/v1/subscribe', (req, res) => {
//     const { topic } = req.body;
//     mqttService.subscribe(topic);
//     res.status(200).json({ message: 'Successfully subscribed to topic' });
// });

// // POST Unsubscribe from MQTT topic
// router.post('/v1/unsubscribe', (req, res) => {
//     const { topic } = req.body;
//     mqttService.unsubscribe(topic);
//     res.status(200).json({ message: 'Successfully unsubscribed from topic' });
// });


module.exports = router;


// -------------------
// const subscriberController = require('./subscriberController');

// // Define route for getting subscriber data
// router.get('/', subscriberController.getSubscriberData);

// -------------------------
//const subscriberRoutes = require("./v1/routes/subscriber");
//const publisherRoutes = require("./v1/routes/publisher");

// Define routes for v1 subscriber and publisher
//router.use("/v1/subscriber", subscriberRoutes);
//router.use("/v1/publisher", publisherRoutes);


