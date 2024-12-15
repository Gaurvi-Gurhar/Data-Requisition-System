const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.delete("/cancel-request", (req, res) => {
    const { request_id } = req.body;

    console.log(request_id)

    if (!request_id) {
        return res.status(400).json({ error: "Invalid request. Missing request_id." });
    }

    const sql = "DELETE FROM requests WHERE request_id = ?;";

    db.query(sql, [request_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Error! Please try again later." });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: "Your request has been cancelled successfully.",
            });
        } else {
            return res.status(404).json({ error: "No request found with the provided request_id." });
        }
    });
});

module.exports = router;
