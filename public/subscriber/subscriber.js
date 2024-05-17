//const mqtt = require("mqtt");
//const WebSocket = require("ws");
let wsClient;
// --------------------

let mqttClient;

window.addEventListener("load", (event) => {
  connectToBroker();

  // Establish WebSocket connection
  //connectToWebSocket();


  const subscribeBtn = document.querySelector("#subscribe");
  subscribeBtn.addEventListener("click", function () {
    subscribeToTopic();
  });

  const unsubscribeBtn = document.querySelector("#unsubscribe");
  unsubscribeBtn.addEventListener("click", function () {
    unsubscribeToTopic();
  });
});

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Config
  const host = "ws://192.168.0.108:9001";
  //const host = "ws://192.168.0.108:1883";

  //const host = "ws://localhost:9001";
  //const host = "ws://broker.emqx.io:8083/mqtt";
  //8887 : MQTT, encrypted, server certificate deliberately expired
  //8080 : MQTT over WebSockets, unencrypted, unauthenticated
  //8081 : MQTT over WebSockets, encrypted, unauthenticated
  //8090 : MQTT over WebSockets, unencrypted, authenticated
  
  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    //port: 8000,
    //path: "/mqtt",
  };

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

  // Received
  mqttClient.on("message", (topic, message, packet) => {
    // dev console
    console.log(
      "Received Message1: " + message.toString() + "\nOn topic: " + topic
    );
    const messageTextArea = document.querySelector("#message");
    messageTextArea.value += message + "\r\n";
    // web push
    showNotification(message);
  });
}


function showNotification(message) {
  console.log("Notification received : ",message);
  if (Notification.permission === "granted") {
    var notification = new Notification("New Message(3)", {
      body: message,
      //icon: "path/to/icon.png"
    });
    // Close the notification after a certain duration (e.g., 3 seconds)
    setTimeout(notification.close.bind(notification), 3000);
  } else if (Notification.permission !== "denied") {
    // Request permission for notifications if it hasn't been granted or denied
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        // Show the notification if permission is granted
        showNotification(message);
      }
    });
  }
}


// ---------------------------------------------------------------------
function connectToWebSocket() {
  //const wsHost = "ws://localhost:8080"; // Change to your WebSocket server address
  const wsHost = "ws://192.168.0.108:9001/mqtt";

  //const wsHost = "ws://broker.emqx.io:8083/mqtt";
  wsClient = new WebSocket(wsHost);

  wsClient.onopen = () => {
    console.log("WebSocket connected");
  };

  wsClient.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  wsClient.onmessage = (event) => {
    console.log("Received WebSocket message:", event.data);
    // Handle WebSocket message here
  };
}
// ----------------------------------------------------------------

function subscribeToTopic() {
  const status = document.querySelector("#status");
  const topic = document.querySelector("#topic").value.trim();
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
  status.style.color = "green";
  status.value = "SUBSCRIBED...";
}

function unsubscribeToTopic() {
  const status = document.querySelector("#status");
  const topic = document.querySelector("#topic").value.trim();
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, { qos: 0 });
  status.style.color = "red";
  status.value = "UNSUBSCRIBED";
}
