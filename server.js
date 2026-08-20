const express = require('express');
const app = express();

// Manual CORS Middleware - Paste this right after app initialization
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  // Instantly handle preflight OPTIONS checks
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ... rest of your routes (post /api/sync, get /api/tiers, etc.)
