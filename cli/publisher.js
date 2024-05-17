const mqtt = require("mqtt");

//var mqttClient;
let mqttClient;

// Config
//const mqttHost = "192.168.0.108";
//const mqttHost = "localhost";
//const protocol = "mqtt";
//const port = "1883";

// ------------------------------------------------------------
// window.addEventListener("load", (event) => {
//   connectToBroker();

//   const publishBtn = document.querySelector(".publish");
//   publishBtn.addEventListener("click", function () {
//     publishMessage();
//   });
// });
// -----------------------------------------------------------------------

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  //const hostURL = `${protocol}://${mqttHost}:${port}`;
  // company
  const host = "ws://192.168.0.108:9001/mqtt";

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  // hostURL
  mqttClient = mqtt.connect(host, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

// topic, message
function publishMessage() {
  //
  const messageInput = document.querySelector("#message");
  const topic = document.querySelector("#topic").value.trim();
  const message = messageInput.value.trim();
  //
  console.log(`Sending Topic: ${topic}, Message: ${message}`);

  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
  //
  messageInput.value = "";

}

connectToBroker();
// an example
publishMessage("temperature", "32")
