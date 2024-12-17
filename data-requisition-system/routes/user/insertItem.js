const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.post('/insert-items', async (req, res) => {

    const { item_name } = req.body;

    if (!item_name) {
        return res.status(400).send('Item name is required');
    }

    console.log(req.body, "---------req.body")

    const sql = "INSERT INTO item (item_name) VALUES (?)";

    db.query(sql, [item_name], (err, result) => {
        if (err) {
            console.error("Error inserting item:", err);
            return res.status(500).json({ error: "Error inserting item." });
        }

        return res.status(201).json({
            message: "Your request has been submitted.",
        });
    });
});

module.exports = router;