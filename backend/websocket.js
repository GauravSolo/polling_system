const WebSocket = require('ws');
const db = require('./db');

let wss = null;

async function getActiveQuestionForStudent(studentId = -1) {
  const questions = await db.query(
    `SELECT id, question_text, timer_duration, timer_start, timer_end
     FROM questions
     WHERE status = 'active' AND (timer_end IS NULL OR timer_end > NOW())
     ORDER BY created_at DESC
     LIMIT 1`
  );

  if (questions.rows.length === 0) return null;
  const question = questions.rows[0];

  const optionsRes = await db.query(
    `SELECT o.id, o.option_text AS text, o.is_correct
     FROM options o
     WHERE o.question_id = $1
     ORDER BY o.id`,
    [question.id]
  );

  const votesRes = await db.query(
    `SELECT o.id AS option_id, COUNT(a.id)::int AS count
     FROM options o
     LEFT JOIN answers a ON o.id = a.option_id AND a.question_id = $1
     WHERE o.question_id = $1
     GROUP BY o.id`,
    [question.id]
  );

  const voteMap = {};
  let total = 0;
  votesRes.rows.forEach((r) => {
    voteMap[r.option_id] = Number(r.count);
    total += Number(r.count);
  });

  const options = optionsRes.rows.map((opt) => ({
    id: opt.id,
    text: opt.text,
    is_correct: opt.is_correct,
    count: voteMap[opt.id] || 0,
  }));

  let answered = false;
  if (studentId != null && studentId !== -1) {
    const answers = await db.query(
      `SELECT id FROM answers WHERE question_id = $1 AND student_id = $2`,
      [question.id, studentId]
    );
    answered = answers.rows.length > 0;
  }

  return {
    id: question.id,
    question_text: question.question_text,
    timer_duration: question.timer_duration,
    timer_start: question.timer_start,
    timer_end: question.timer_end,
    options,
    totalVotes: total,
    answered,
  };
}

async function sendActiveToClient(ws) {
  try {
    const studentId = ws.studentId ?? -1;
    const payload = await getActiveQuestionForStudent(studentId);
    if (!payload) {
      ws.send(JSON.stringify({ type: 'no_active' }));
      return;
    }
    ws.send(JSON.stringify({ type: 'active_question', payload }));
  } catch (err) {
    console.error('sendActiveToClient error', err);
  }
}

function initWSS(server) {
  if (wss) return wss; 
  wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    ws.studentId = -1;
    ws.role = null;
    ws.isAlive = true;

    ws.on('message', async (message) => {
      try {
        const msg = JSON.parse(message);
        if (msg.type === 'register') {
          ws.studentId = typeof msg.studentId === 'number' ? msg.studentId : -1;
          ws.role = msg.role || null;
          await sendActiveToClient(ws);
        }
      } catch (err) {
        console.error('WS message parse error', err);
      }
    });

    ws.on('pong', () => {
      ws.isAlive = true;
    });

    sendActiveToClient(ws);
  });

  const interval = setInterval(() => {
    if (!wss) return;
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  wss.on('close', () => clearInterval(interval));

  return wss;
}

async function broadcastActive() {
  if (!wss) return;
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      await sendActiveToClient(client);
    }
  }
}

module.exports = { initWSS, broadcastActive };
