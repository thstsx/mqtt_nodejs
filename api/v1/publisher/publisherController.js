const express = require('express');
const router = express.Router();

// Define routes for publisher related API endpoints
router.get('/publisher', (req, res) => {
    res.send('This is the publisher endpoint in API version 1');
});

module.exports = router;
