const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { question, timer, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res
        .status(400)
        .json({ error: "Question text and at least 2 options are required." });
    }

    const questionResult = await db.query(
      `INSERT INTO questions (question_text, timer_duration, timer_start, timer_end) 
       VALUES ($1, $2, NOW(), NOW() + ($3 || ' seconds')::interval)
       RETURNING id`,
      [question, timer || 60, timer || 60]
    );

    const questionId = questionResult.rows[0].id;

    const optionPromises = options.map((opt) => {
      return db.query(
        "INSERT INTO options (question_id, option_text, is_correct) VALUES ($1, $2, $3)",
        [questionId, opt.text, opt.is_correct ? true : false]
      );
    });

    await Promise.all(optionPromises);

    res
      .status(201)
      .json({ message: "Question created successfully", questionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create question" });
  }
});

router.get("/active", async (req, res) => {
  try {
    const studentId = req.query.student_id;

    const questions = await db.query(
      "SELECT id, question_text, timer_duration, timer_start, timer_end FROM questions WHERE status='active' ORDER BY created_at DESC LIMIT 1"
    );

    if (questions.rows.length === 0)
      return res.json({ message: "No active question" });

    const question = questions.rows[0];

    const options = await db.query(
      "SELECT id, option_text, is_correct FROM options WHERE question_id = $1",
      [question.id]
    );

    let answered = false;

    if (studentId) {
      const answers = await db.query(
        "SELECT id FROM answers WHERE question_id = $1 AND student_id = $2",
        [question.id, studentId]
      );
      answered = answers.rows.length > 0;
    }

    res.json({ ...question, options: options.rows, answered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch active question" });
  }
});

router.get("/:id/votes", async (req, res) => {
  try {
    const question_id = req.params.id;

    const votes = await db.query(
      `SELECT o.id AS option_id, o.option_text, COUNT(a.id) AS count
       FROM options o
       LEFT JOIN answers a ON o.id = a.option_id AND a.question_id = $1
       WHERE o.question_id = $1
       GROUP BY o.id, o.option_text`,
      [question_id]
    );

    res.json(votes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch votes" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const questions = await db.query(
      `SELECT id, question_text, timer_start, timer_end 
       FROM questions 
       ORDER BY created_at DESC`
    );

    const history = [];

    for (const q of questions.rows) {
      const options = await db.query(
        `SELECT o.id, o.option_text, COUNT(a.id) as votes
         FROM options o
         LEFT JOIN answers a ON o.id = a.option_id
         WHERE o.question_id = $1
         GROUP BY o.id`,
        [q.id]
      );

      history.push({ ...q, options: options.rows });
    }

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch poll history" });
  }
});

module.exports = router;
