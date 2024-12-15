const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get('/get-items', async (req, res) => {
    try {
        // const items = await db.query('SELECT item_name FROM item'); 

        const sql = "SELECT item_name FROM item";

    db.query(sql,(err, result) => {
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
        // return res.json(items.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;