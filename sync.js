const express = require('express');
const router = express.Router();

// Temporary in-memory cache
let tierDatabase = {};

// GET /api/sync - Returns current player data to the frontend
router.get('/sync', (req, res) => {
  res.status(200).json({
    success: true,
    data: tierDatabase
  });
});

// POST /api/sync - Receives updates from bot/script
router.post('/sync', (req, res) => {
  const { player, uuid, tier, secretKey } = req.body;

  // Verify input data
  if (!player || !tier) {
    return res.status(400).json({
      success: false,
      message: 'Missing required parameters: player and tier'
    });
  }

  // Save/Update record
  tierDatabase[player] = {
    uuid: uuid || null,
    tier: tier,
    lastUpdated: new Date().toISOString()
  };

  console.log(`[Sync Event] Updated ${player} -> Tier: ${tier}`);

  return res.status(200).json({
    success: true,
    message: `Updated tier data for ${player}`,
    updatedData: tierDatabase[player]
  });
});

module.exports = router;
