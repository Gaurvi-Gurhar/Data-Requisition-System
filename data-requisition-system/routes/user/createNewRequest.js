const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.post("/create-new-request", (req, res) => {
    const { username, group_name, selected_item, quantity, past_purchase } = req.body;

    console.log(req.body, "---------req.body")

    if (!username || !group_name || !selected_item || !quantity || !past_purchase) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "INSERT INTO requests (username, group_name, selected_item, quantity, past_purchase) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [username, group_name, selected_item, quantity, past_purchase], (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ error: "Error registering user." });
        }

        return res.status(201).json({
            message: "Your request has been submitted.",
        });
    });
});

module.exports = router;