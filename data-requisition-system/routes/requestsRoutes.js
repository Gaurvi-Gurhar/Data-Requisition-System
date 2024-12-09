const express = require('express');
const db = require('../config/db');
const router = express.Router();

// View Existing Requests
router.get('/user/:userId/requests', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM requests WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Create New Request
router.post('/user/:userId/create', (req, res) => {
  const { userId } = req.params;
  const { item_id, quantity, past_purchase } = req.body;
  const query = 'INSERT INTO requests (user_id, item_id, quantity, past_purchase) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, item_id, quantity, past_purchase], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Request created successfully' });
  });
});

// Update Existing Request
router.put('/user/:userId/update/:requestId', (req, res) => {
  const { userId, requestId } = req.params;
  const { item_id, quantity } = req.body;
  const query = 'UPDATE requests SET item_id = ?, quantity = ? WHERE request_id = ? AND user_id = ?';
  db.query(query, [item_id, quantity, requestId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Request updated successfully' });
  });
});

// Cancel Request
router.delete('/user/:userId/cancel/:requestId', (req, res) => {
  const { userId, requestId } = req.params;
  const query = 'DELETE FROM requests WHERE request_id = ? AND user_id = ?';
  db.query(query, [requestId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Request cancelled successfully' });
  });
});

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const requestController = require('../controllers/requestController');

// // Get all requests
// router.get('/requests', (req, res) => {
//     console.log("Received GET request for /requests"); // Add this log
//     requestController.getRequests(req, res);
// });

// // Create a new request
// router.post('/requests', requestController.createRequest);

// // Update request status
// router.put('/requests/:id', requestController.updateRequest);

// // Delete a request
// router.delete('/requests/:id', requestController.deleteRequest);

// module.exports = router;
