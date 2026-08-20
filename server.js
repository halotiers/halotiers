const express = require('express');
const cors = require('cors'); // 1. Imported cors package
const app = express();

app.use(cors()); // 2. Allowed outside websites like GitHub Pages to access your API
app.use(express.json());

let ticketDatabase = [];

// Route for your bot to send data
app.post('/api/sync', (req, res) => {
    // If bot sends a whole list, replace; if single item, push
    if (Array.isArray(req.body)) {
      ticketDatabase = req.body;
    } else {
      ticketDatabase.push(req.body); 
    }
    
    console.log("🚨 NEW TICKET SAVED:", req.body);
    res.status(200).send({ message: "Data received loud and clear!" });
});

// Route for your GitHub frontend website to fetch data
app.get('/api/tiers', (req, res) => {
    res.json(ticketDatabase); 
});

// Backup route if you use /api/data
app.get('/api/data', (req, res) => {
    res.json(ticketDatabase); 
});

app.listen(8000, () => {
    console.log("Website backend is running on port 8000!");
});
