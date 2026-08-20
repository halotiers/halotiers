const express = require('express');
const cors = require('cors');
const app = express();

// 1. Primary CORS handler
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 2. Fail-safe CORS middleware (forces headers on all responses)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Data storage
let ticketDatabase = [];

// POST route: Receives data from your bot
app.post('/api/sync', (req, res) => {
  if (Array.isArray(req.body)) {
    ticketDatabase = req.body;
  } else {
    ticketDatabase.push(req.body);
  }
  console.log("🚨 NEW DATA SAVED:", req.body);
  res.status(200).send({ message: "Data received loud and clear!" });
});

// GET routes: Serves data to GitHub Pages
app.get('/api/tiers', (req, res) => {
  res.json(ticketDatabase);
});

app.get('/api/data', (req, res) => {
  res.json(ticketDatabase);
});

app.get('/', (req, res) => {
  res.send("API is online with CORS enabled.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Website backend running on port ${PORT}!`);
});
