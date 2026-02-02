const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const badgeService = require('../services/badgeService');

// Trigger manual badge check (for testing/initial setup)
router.post('/trigger', authMiddleware, async (req, res) => {
  try {
    const newBadges = await badgeService.checkAndAwardBadges(req.user);
    res.json({ 
      success: true, 
      message: `Awarded ${newBadges.length} new badges`, 
      badges: newBadges 
    });
  } catch (error) {
    console.error('Error triggering badge check:', error);
    res.status(500).json({ error: 'Failed to check badges' });
  }
});

module.exports = router;
