const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.post("/login", (req, res) => {
    const { email, password} = req.body;

    console.log(req.body, "---------req.body")

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

    db.query(sql,[email,password], (err, result) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Error! Please check user credentials."});
        }

        if (result.length > 0) {
            return res.status(200).json({
                message: "Successfully logged in.",
            });
        } else {
            return res.status(404).json({ error: "User does not exist." });
        }
    });
});

module.exports = router;