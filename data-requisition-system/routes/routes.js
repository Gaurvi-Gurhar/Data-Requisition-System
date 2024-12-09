const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');  // Import the controller

// Define routes and connect them to controller functions
router.get('/requests', (req, res) => {
  console.log("Received GET request for /requests"); // Add this log
  requestController.getRequests(req, res);
});
router.post('/requests', requestController.createRequest);
router.put('/requests/:id', requestController.updateRequest);
router.delete('/requests/:id', requestController.deleteRequest);

// Export the router
module.exports = router;
