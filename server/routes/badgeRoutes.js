const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Get all badges with progress
router.get('/', badgeController.getUserBadges);

// Get only earned badges
router.get('/earned', badgeController.getEarnedBadges);

// Check for new badges
router.post('/check', badgeController.checkNewBadges);

// Get badge statistics
router.get('/stats', badgeController.getBadgeStats);

module.exports = router;
