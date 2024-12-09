const db = require('../config/database');  // Ensure the correct path to your DB configuration

// Fetch all requests
const getRequests = (req, res) => {
    db.query('SELECT * FROM requests', (err, results) => {
        if (err) {
            console.error("Error fetching requests:", err); // Add logging for debugging
            return res.status(500).json({ error: err });
        }
        console.log(results); // Log the results to check what data you get
        res.json(results);
    });
};

// Create a new request
const createRequest = (req, res) => {
    const { user_id, item_name, quantity } = req.body;
    const query = 'INSERT INTO requests (user_id, item_name, quantity) VALUES (?, ?, ?)';
    db.query(query, [user_id, item_name, quantity], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Request created successfully' });
    });
};

// Update request status
const updateRequest = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE requests SET status = ? WHERE request_id = ?';
    db.query(query, [status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Request status updated successfully' });
    });
};

// Delete request
const deleteRequest = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM requests WHERE request_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Request deleted successfully' });
    });
};

module.exports = {
    getRequests,
    createRequest,
    updateRequest,
    deleteRequest
};
