const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Get all requests
router.get('/requests', (req, res) => {
    console.log("Received GET request for /requests"); // Add this log
    requestController.getRequests(req, res);
});

// Create a new request
router.post('/requests', requestController.createRequest);

// Update request status
router.put('/requests/:id', requestController.updateRequest);

// Delete a request
router.delete('/requests/:id', requestController.deleteRequest);

module.exports = router;
