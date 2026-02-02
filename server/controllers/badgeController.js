const badgeService = require('../services/badgeService');
const Badge = require('../models/Badge');

// Get user's badges
exports.getUserBadges = async (req, res) => {
  try {
    const badges = await badgeService.getUserBadges(req.user);
    res.json(badges);
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

// Get only earned badges
exports.getEarnedBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ userId: req.user }).sort({ earnedAt: -1 });
    res.json(badges);
  } catch (error) {
    console.error('Error fetching earned badges:', error);
    res.status(500).json({ error: 'Failed to fetch earned badges' });
  }
};

// Check for new badges (called after problem creation)
exports.checkNewBadges = async (req, res) => {
  try {
    const newBadges = await badgeService.checkAndAwardBadges(req.user);
    res.json({ newBadges, count: newBadges.length });
  } catch (error) {
    console.error('Error checking badges:', error);
    res.status(500).json({ error: 'Failed to check badges' });
  }
};

// Get badge stats
exports.getBadgeStats = async (req, res) => {
  try {
    const earnedBadges = await Badge.find({ userId: req.user });
    
    const stats = {
      total: earnedBadges.length,
      byType: {},
      byTier: {},
      recent: earnedBadges.slice(0, 5)
    };
    
    earnedBadges.forEach(badge => {
      stats.byType[badge.badgeType] = (stats.byType[badge.badgeType] || 0) + 1;
      stats.byTier[badge.tier] = (stats.byTier[badge.tier] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching badge stats:', error);
    res.status(500).json({ error: 'Failed to fetch badge stats' });
  }
};
