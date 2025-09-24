const express = require("express");
const router = express.Router();
const db = require("../db");
const ws = require("../websocket");

router.post("/", async (req, res) => {
  try {
    const { question_id, student_id, option_id } = req.body;

    if (!question_id || !student_id || !option_id) {
      return res
        .status(400)
        .json({ error: "question_id, student_id and option_id are required" });
    }

    const existing = await db.query(
      "SELECT * FROM answers WHERE question_id = $1 AND student_id = $2",
      [question_id, student_id]
    );

    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Student has already answered this question" });
    }

    await db.query(
      "INSERT INTO answers (question_id, student_id, option_id) VALUES ($1, $2, $3)",
      [question_id, student_id, option_id]
    );


    try {
      await ws.broadcastActive();
    } catch (e) {
      console.error("WS broadcast error after answer insert", e);
    }
    
    res.status(201).json({ message: "Answer submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit answer" });
  }
});

router.get("/question/:id", async (req, res) => {
  try {
    const question_id = req.params.id;

    const answers = await db.query(
      `SELECT a.id, a.student_id, s.name AS student_name, a.option_id, o.option_text
       FROM answers a
       JOIN students s ON a.student_id = s.id
       JOIN options o ON a.option_id = o.id
       WHERE a.question_id = $1`,
      [question_id]
    );

    res.json(answers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch answers" });
  }
});

module.exports = router;
