const express = require('express');
const app = express();

app.use(express.json());

// 1. Create a list to store the data the API receives
let ticketDatabase = [];

// 2. This is the POST route your bot sends data to
app.post('/api/sync', (req, res) => {
    // Add the incoming bot data to our list
    ticketDatabase.push(req.body); 
    
    console.log("🚨 NEW TICKET SAVED:", req.body);
    res.status(200).send({ message: "Data received loud and clear!" });
});

// 3. This is the new GET route for YOU to view the data
app.get('/api/data', (req, res) => {
    // This sends the entire list to your browser so you can read it
    res.json(ticketDatabase); 
});

app.listen(8000, () => {
    console.log("Website backend is running!");
});
