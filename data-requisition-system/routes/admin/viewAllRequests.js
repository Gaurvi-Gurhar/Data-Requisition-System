const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/view-all-requests", (req, res) => {

    const sql = "SELECT r.*, i.item_name FROM requests r LEFT JOIN item i ON r.item_id = i.item_id";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Error! Please check your network." });
        }

        if (result.length > 0) {
            return res.status(200).json({
                message: "Successfully fetched data.",
                data: result // Return the entire result set
            });
        } else {
            return res.status(404).json({ error: "No requests found." });
        }
    });
});

module.exports = router;
