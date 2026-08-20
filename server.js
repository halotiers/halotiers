const express = require('express');
const app = express();

// This is required so your server can read the JSON data the bot sends
app.use(express.json());

// This route catches the data sent from your Discord bot
app.post('/api/sync', (req, res) => {
    // 1. This prints the exact data to your PandaStack console!
    console.log("🚨 NEW TICKET DATA RECEIVED:", req.body);

    // 2. You can access individual pieces of data like this:
    const { discordUsername, ign, tierResult } = req.body;
    console.log(`Player ${ign} (${discordUsername}) got tier: ${tierResult}`);

    // 3. Tell the Discord bot we got it successfully
    res.status(200).send({ message: "Data received loud and clear!" });
});

app.listen(8000, () => {
    console.log("Website backend is running!");
});
