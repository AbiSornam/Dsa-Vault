const mongoose = require('mongoose');
require('dotenv').config();
const badgeService = require('../services/badgeService');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const updateAllUserBadges = async () => {
  try {
    await connectDB();
    
    const users = await User.find();
    console.log(`Found ${users.length} users`);
    
    for (const user of users) {
      console.log(`\nChecking badges for user: ${user.name} (${user.email})`);
      const newBadges = await badgeService.checkAndAwardBadges(user._id);
      console.log(`Awarded ${newBadges.length} new badges`);
      
      if (newBadges.length > 0) {
        newBadges.forEach(badge => {
          console.log(`  ✅ ${badge.icon} ${badge.badgeName} - ${badge.description}`);
        });
      }
    }
    
    console.log('\n✅ Badge update complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating badges:', error);
    process.exit(1);
  }
};

updateAllUserBadges();
