const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.post("/register", (req, res) => {
    const { username, email, password, group_name, role } = req.body;

    console.log(req.body, "---------req.body")

    if (!username || !email || !password || !group_name || !role) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "INSERT INTO user (username, email, password, group_name, role) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [username, email, password, group_name, role], (err, result) => {
        
        if (err) {
            console.error("Error registering user:", err);
            return res.status(500).json({ error: "Error registering user." });
        }

        return res.status(201).json({
            message: "User has been registered successfully.",
        });
    });
});

module.exports = router;