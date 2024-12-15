const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/view-consolidate-request", (req, res) => {
    const { requestDate, itemName, status } = req.query;

    let sql = "SELECT * FROM requests";
    const filters = [];

    if (requestDate) {
        filters.push(`date_of_request >= '${requestDate}'`);
    }
    if (itemName && itemName !== "all") {
        filters.push(`item_id = (SELECT item_id FROM items WHERE item_name = '${itemName}')`);
    }
    if (status && status !== "all") {
        filters.push(`status = '${status}'`);
    }

    if (filters.length > 0) {
        sql += " WHERE " + filters.join(" AND ");
    }

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Error fetching data from the database." });
        }
        res.json(results);
    });
});

module.exports = router;
