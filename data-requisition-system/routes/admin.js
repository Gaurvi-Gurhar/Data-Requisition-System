// routes/admin.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// View All User Requests
router.get('/view-requests', (req, res) => {
  db.query('SELECT * FROM requests', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
});

// Approve or Reject Requests
router.post('/allocate-items', (req, res) => {
  const { requestId, action } = req.body;

  const status = action === 'approve' ? 'approved' : 'rejected';
  db.query(
    'UPDATE requests SET status = ? WHERE request_id = ?',
    [status, requestId],
    (error) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json({ message: 'Status updated successfully' });
    }
  );
});

module.exports = router;
