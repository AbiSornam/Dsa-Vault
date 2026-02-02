const Badge = require('../models/Badge');
const Problem = require('../models/Problem');
const { BADGE_DEFINITIONS } = require('../utils/badgeDefinitions');

class BadgeService {
  
  // Check and award badges for a user
  async checkAndAwardBadges(userId) {
    const newBadges = [];
    
    // Get user's problems and existing badges
    const problems = await Problem.find({ userId: userId });
    const existingBadges = await Badge.find({ userId });
    const existingBadgeIds = new Set(existingBadges.map(b => b.badgeId));
    
    // Check each badge definition
    for (const [badgeId, badgeDef] of Object.entries(BADGE_DEFINITIONS)) {
      if (existingBadgeIds.has(badgeId)) continue; // Already earned
      
      const earned = await this.checkBadgeRequirement(userId, problems, badgeDef);
      
      if (earned) {
        const badge = new Badge({
          userId,
          badgeId: badgeDef.id,
          badgeName: badgeDef.name,
          badgeType: badgeDef.type,
          tier: badgeDef.tier,
          description: badgeDef.description,
          icon: badgeDef.icon,
          color: badgeDef.color,
          metadata: earned.metadata || {}
        });
        
        await badge.save();
        newBadges.push(badge);
      }
    }
    
    return newBadges;
  }

  // Check if a specific badge requirement is met
  async checkBadgeRequirement(userId, problems, badgeDef) {
    const req = badgeDef.requirement;
    
    switch (req.type) {
      case 'total_problems':
        return problems.length >= req.count ? { earned: true } : null;
      
      case 'difficulty':
        const diffCount = problems.filter(p => p.difficulty === req.difficulty).length;
        return diffCount >= req.count ? { earned: true, metadata: { count: diffCount } } : null;
      
      case 'topic':
        const topicCount = problems.filter(p => 
          p.topic.toLowerCase() === req.topic.toLowerCase()
        ).length;
        return topicCount >= req.count ? { earned: true, metadata: { count: topicCount } } : null;
      
      case 'streak':
        const currentStreak = await this.calculateStreak(userId);
        return currentStreak >= req.days ? { earned: true, metadata: { streak: currentStreak } } : null;
      
      case 'time_range':
        const timeRangeCount = problems.filter(p => {
          const hour = new Date(p.createdAt).getHours();
          if (req.start > req.end) { // Crosses midnight
            return (hour >= req.start || hour < req.end);
          }
          return hour >= req.start && hour < req.end;
        }).length;
        return timeRangeCount >= req.count ? { earned: true, metadata: { count: timeRangeCount } } : null;
      
      case 'weekend':
        const weekendCount = problems.filter(p => {
          const day = new Date(p.createdAt).getDay();
          return day === 0 || day === 6; // Sunday or Saturday
        }).length;
        return weekendCount >= req.count ? { earned: true, metadata: { count: weekendCount } } : null;
      
      case 'daily_count':
        const todayCount = problems.filter(p => {
          const today = new Date();
          const pDate = new Date(p.createdAt);
          return pDate.toDateString() === today.toDateString();
        }).length;
        return todayCount >= req.count ? { earned: true, metadata: { count: todayCount } } : null;
      
      case 'consistency':
        const consistentStreak = await this.calculateStreak(userId);
        return consistentStreak >= req.days ? { earned: true, metadata: { days: consistentStreak } } : null;
      
      default:
        return null;
    }
  }

  // Calculate current streak
  async calculateStreak(userId) {
    const problems = await Problem.find({ userId: userId }).sort({ createdAt: -1 });
    if (problems.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const dates = new Set();
    problems.forEach(p => {
      const date = new Date(p.createdAt);
      date.setHours(0, 0, 0, 0);
      dates.add(date.getTime());
    });
    
    const sortedDates = Array.from(dates).sort((a, b) => b - a);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
      if (sortedDates[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  // Get user's badges with progress
  async getUserBadges(userId) {
    const earnedBadges = await Badge.find({ userId }).sort({ earnedAt: -1 });
    const problems = await Problem.find({ userId: userId });
    
    // Calculate progress for unearned badges
    const allBadges = [];
    
    for (const [badgeId, badgeDef] of Object.entries(BADGE_DEFINITIONS)) {
      const earned = earnedBadges.find(b => b.badgeId === badgeId);
      
      if (earned) {
        allBadges.push({ ...earned.toObject(), progress: 100, locked: false });
      } else {
        const progress = await this.calculateBadgeProgress(userId, problems, badgeDef);
        allBadges.push({
          badgeId: badgeDef.id,
          badgeName: badgeDef.name,
          badgeType: badgeDef.type,
          tier: badgeDef.tier,
          description: badgeDef.description,
          icon: badgeDef.icon,
          color: badgeDef.color,
          progress,
          locked: true
        });
      }
    }
    
    return allBadges;
  }

  // Calculate progress towards a badge
  async calculateBadgeProgress(userId, problems, badgeDef) {
    const req = badgeDef.requirement;
    
    switch (req.type) {
      case 'total_problems':
        return Math.min((problems.length / req.count) * 100, 100);
      
      case 'difficulty':
        const diffCount = problems.filter(p => p.difficulty === req.difficulty).length;
        return Math.min((diffCount / req.count) * 100, 100);
      
      case 'topic':
        const topicCount = problems.filter(p => 
          p.topic.toLowerCase() === req.topic.toLowerCase()
        ).length;
        return Math.min((topicCount / req.count) * 100, 100);
      
      case 'streak':
        const currentStreak = await this.calculateStreak(userId);
        return Math.min((currentStreak / req.days) * 100, 100);
      
      default:
        return 0;
    }
  }
}

module.exports = new BadgeService();
