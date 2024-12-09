const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Example Route: Test DB Connection
router.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Query error:', err.message);
            res.status(500).send('Database query failed');
        } else {
            res.send(`Database connection is working! Solution: ${results[0].solution}`);
        }
    });
});

module.exports = router;
