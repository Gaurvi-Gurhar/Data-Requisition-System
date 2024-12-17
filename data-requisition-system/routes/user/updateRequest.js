const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.put("/update-request", (req, res) => {
    const { request_id, selected_item, quantity, past_purchase } = req.body;

    console.log(req.body, "-------req.body")

    if (!request_id || !quantity || !past_purchase || !selected_item) {
        return res.status(400).json({ error: "Invalid request. Missing required fields." });
    }

    const sql = "UPDATE requests SET quantity = ?, past_purchase = ?, selected_item = ? WHERE request_id = ?;";

    db.query(sql, [quantity, past_purchase, selected_item, request_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Error! Please try again later." });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                message: "Your request has been updated successfully.",
            });
        } else {
            return res.status(404).json({ error: "No request found with the provided request_id." });
        }
    });
});

module.exports = router;
