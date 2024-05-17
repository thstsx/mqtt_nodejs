const express = require("express");
const router = express.Router();

var subscriberController = require("../controllers/subscriber");

// Home(Sub)
router.get("/", subscriberController.getSubscriberPage);

module.exports = router;
