const mqtt = require("mqtt");

class MQTTService {
  constructor(host, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.messageCallback = messageCallback;
  }

   // Check MQTT Connection Status
  //  isConnected() {
  //   return this.mqttClient.connected; // Assuming mqttClient is your MQTT client instance
  // }

  isConnected() {
    return this.mqttClient && this.mqttClient.connected;
  }

  // handleMessage(topic, message) {
  //   console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
  //   // Additional logic to handle MQTT message if needed
  // }
  // handleMessage(topic, message) {
  //   console.log(`Received MQTT message: ${message.toString()} on topic: ${topic}`);
  //   // Additional logic to handle MQTT message if needed
  //   if (this.messageCallback) this.messageCallback(topic, message);
  // }

  connect(callback) {
    this.mqttClient = mqtt.connect(this.host);

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected(api)`);
      // -------------------------------------------
      console.log('---------');
      if (typeof this.messageCallback === 'function') {
        this.messageCallback(200);
      }
    });

    // Call the message callback function when message arrived
    this.mqttClient.on("message", function (topic, message) {
      console.log(message.toString());
      if (this.messageCallback) this.messageCallback(topic, message);
    });

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected(api)`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    this.mqttClient.publish(topic, message);
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }
}

module.exports = MQTTService;
