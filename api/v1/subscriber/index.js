// const express = require("express");
// const router = express.Router();

// var subscriberController = require("../controllers/subscriber");

// Home(Sub)
//router.get("/subscriber", subscriberController.getSubscriberPage);

//module.exports = router;

// mqtt/api/v1/routes/subscriber.js
const express = require('express');
const router = express.Router();
const subscriberController = require('./subscriberController');

// Define route for getting subscriber data
//router.get('/', subscriberController.getSubscriberData);
// router.get('/', (req, res) => {
//     // Your route handling logic here
//   });

router.get("/", subscriberController.getSubscriberData);

router.get('/connection-status', (req, res) => {
    //res.json({ connected: true });
    if (mqttService.isConnected()) {
      // If connected, send a response with status code 200
      res.status(200).json({ connected: true });
  } else {
      // If not connected, send an error response with status code 500
      res.status(500).json({ connected: false });
  }
  });

// Define route for checking MQTT connection status
//router.get('/connection-status', subscriberController.getConnectionStatus); // Include the route here

module.exports = router;




// const getConnectionStatus = async (req, res) => {
//     try {
//         // Check MQTT connection status and respond accordingly
//         const isConnected = mqttClient.isConnected();
//         res.status(200).json({ connected: isConnected });
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ error: error.message });
//     }
// };

// Export the getConnectionStatus function
// module.exports = {
//     getConnectionStatus
// };
