const express = require('express');
const cors = require('cors');
const path = require('path');
const syncRouter = require('./sync');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static web pages from current folder
app.use(express.static(path.join(__dirname, '.')));

// API Route Endpoint
app.use('/api', syncRouter);

// Fallback to serve main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server is online and listening on port ${PORT}`);
});
