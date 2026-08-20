const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS explicitly for all origins and headers BEFORE defining routes
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

let ticketDatabase = [];

app.post('/api/sync', (req, res) => {
    if (Array.isArray(req.body)) {
        ticketDatabase = req.body;
    } else {
        ticketDatabase.push(req.body); 
    }
    console.log("🚨 NEW TICKET SAVED:", req.body);
    res.status(200).send({ message: "Data received loud and clear!" });
});

app.get('/api/tiers', (req, res) => {
    res.json(ticketDatabase); 
});

app.get('/api/data', (req, res) => {
    res.json(ticketDatabase); 
});

app.listen(8000, () => {
    console.log("Website backend is running on port 8000!");
});
