const express = require('express');
const router = express.Router();
const db = require('../config/db');




// Register User
router.post('/register', (req, res) => {
    const { username, group_name, email, password } = req.body;
  
    const query = 'INSERT INTO user (username, group_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, group_name, email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
  
  // Login User
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  
      res.status(200).json({ message: 'Login successful', user: results[0] });
    });
  });
  





// // Example Route: Test DB Connection
// router.get('/test-db', (req, res) => {
//     console.log('Endpoint /test-db hit');
//     db.query('SELECT 1 + 1 AS solution', (err, results) => {
//         if (err) {
//             console.error('Query error:', err.message);
//             return res.status(500).send('Database query failed');
//         }
//         console.log('Query results:', results);
//         res.send(`Database connection is working! Solution: ${results[0].solution}`);
//     });
// });


module.exports = router;
