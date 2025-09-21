const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING id",
      [name]
    );

    res.status(201).json({ id: result.rows[0].id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

module.exports = router;
