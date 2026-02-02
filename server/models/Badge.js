const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeId: { type: String, required: true },
  badgeName: { type: String, required: true },
  badgeType: { 
    type: String, 
    enum: ['problem_count', 'difficulty', 'topic', 'streak', 'speed', 'special'],
    required: true 
  },
  tier: { 
    type: String, 
    enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
    default: 'bronze'
  },
  description: { type: String },
  icon: { type: String },
  color: { type: String },
  earnedAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 100 }, // 100 means completed
  metadata: { type: Object } // Additional data like count, topic name, etc.
}, { timestamps: true });

// Compound index to prevent duplicate badges
badgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

module.exports = mongoose.model('Badge', badgeSchema);
