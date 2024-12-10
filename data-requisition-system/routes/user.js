// routes/user.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// View Existing Requests
router.get('/view-requests/:userId', (req, res) => {
  db.query(
    'SELECT * FROM requests WHERE user_id = ?',
    [req.params.userId],
    (error, results) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json(results);
    }
  );
});

// Create New Request
router.post('/new-request', (req, res) => {
  const { userId, itemId, quantity, past_purchase } = req.body;
  db.query(
    'INSERT INTO requests (user_id, item_id, quantity, past_purchase) VALUES (?, ?, ?, ?)',
    [userId, itemId, quantity, past_purchase],
    (error) => {
      if (error) return res.status(500).json({ error });
      res.status(201).json({ message: 'Request created successfully' });
    }
  );
});

module.exports = router;
