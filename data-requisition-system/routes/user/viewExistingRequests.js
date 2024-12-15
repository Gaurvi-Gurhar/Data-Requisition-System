const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/view-existing-requests", (req, res) => {

    const { group_name } = req.query; 

    if (!group_name) {
        return res.status(400).json({ error: "Department is required." });
    }

    const sql = "SELECT * FROM requests WHERE group_name = ?";

    db.query(sql,[group_name], (err, result) => {
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
