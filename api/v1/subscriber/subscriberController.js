const express = require('express');
const router = express.Router();
const mqttService = require("../service/mqttService");
// ---------------------------------------------------------

const mqttHost = 'ws://192.168.0.108:9001'; // Update with your MQTT broker host
const mqttServiceInstance = new mqttService(mqttHost);

// Connect to MQTT broker
mqttServiceInstance.connect();

// Subscribe to MQTT topic
const subscribeToTopic = (req, res) => {
    try {
        const { topic } = req.body;
        mqttServiceInstance.subscribe(topic);
        res.status(200).json({ message: 'Successfully subscribed to topic' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unsubscribe from MQTT topic
const unsubscribeFromTopic = (req, res) => {
    try {
        const { topic } = req.body;
        mqttServiceInstance.unsubscribe(topic);
        res.status(200).json({ message: 'Successfully unsubscribed from topic' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check MQTT connection status
// const getConnectionStatus = (req, res) => {
//     console.log('aaaaaaaaaaaaaa');
//     try {
//         const connected = mqttServiceInstance.isConnected();
//         res.status(200).json({ connected });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// const getConnectionStatus = (req, res) => {
//     console.log('Attempting to get connection status...');
//     try {
//         // Check if mqttServiceInstance is initialized
//         if (!mqttServiceInstance) {
//             throw new Error('MQTT service instance is not initialized');
//         }

//         // Check if mqttClient is connected
//         const connected = mqttServiceInstance.isConnected();
//         res.status(200).json({ connected });
//     } catch (error) {
//         console.error('Error getting connection status:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    subscribeToTopic,
    unsubscribeFromTopic,
    //getConnectionStatus
};




















// const mqttService = require("../service/mqttService");
// const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

// // Create MQTT client instance
// const mqttClient = new mqttService(MQTT_HOST_NAME);
// mqttClient.connect();

// // Handle incoming MQTT messages
// mqttClient.mqttClient.on("message",(topic, message) => {
//   // Logic to process incoming messages and update API response
//   console.log(`Received message on topic: ${topic}`);
//   console.log(`Message: ${message.toString()}`);
// });


/**
 * @swagger
 * /v1/subscriber:
 *   get:
 *     summary: Get subscriber data
 *     description: Retrieve subscriber data.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The subscriber ID
 *                 name:
 *                   type: string
 *                   description: The subscriber name
 */


// ===================================================================================
const getSubscriberData = (req, res) => {
    // ----------------------------------------------
    const subscriberData = {
      id: 1,
      name: 'Subscriber 1',
    };
  
    // Send JSON response
    res.json(subscriberData);
    // -------------------------------------------------------------------------
    // test
    //res.send('This is the subscriber endpoint in API version 1...');
};

module.exports = {
  getSubscriberData,
  subscribeToTopic,
  unsubscribeFromTopic
};

// module.exports = {
//   getSubscriberData,
// };
// ===================================================================================  

// exports.getConnectionStatus = async function (req, res) {
//   try {
//     // Check MQTT connection status and respond accordingly
//     const isConnected = mqttClient.isConnected();
//     res.status(200).json({ connected: isConnected });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//   }
// };







  
