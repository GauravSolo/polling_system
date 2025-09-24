const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initWSS } = require("./websocket");
const studentRoutes = require("./routes/students");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answers");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.get("/", (req, res) => res.send("Polling system backend is running."));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

initWSS(server);
