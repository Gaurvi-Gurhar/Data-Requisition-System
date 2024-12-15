const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.put("/allocate-request", (req, res) => {
    const { request_id, status } = req.body;

    if (!request_id || !status) {
        return res.status(400).json({ error: "Invalid request. Missing required fields." });
    }

    const sql = "UPDATE requests SET status = ? WHERE request_id = ?;";

    db.query(sql, [status, request_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Error! Please try again later." });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: `Request ${request_id} has been ${status.toLowerCase()} successfully.`,
            });
        } else {
            return res.status(404).json({ error: "No request found with the provided request_id." });
        }
    });
});

module.exports = router;