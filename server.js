import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json({ limit: "1mb" }));

function writeLog(level, message, extra = {}) {
  const logEntry = {
    ts: new Date().toISOString(),
    level,
    message,
    extra,
  };
  console.log(`[${level.toUpperCase()}]`, message, extra);
}

// Endpoint to receive logs
app.post("/log", (req, res) => {
  const { level = "log", message = "", extra = {} } = req.body;
  writeLog(level, message, extra);
  res.json({ status: "ok" });
});

// Health check
app.get("/", (req, res) => res.send("Logger server is running"));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

