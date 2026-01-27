const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");  // Make sure to import the User model

const router = express.Router();

/**
 * GET USER PROFILE (protected)
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Fetch user details using the userId from the decoded token
    const user = await User.findById(req.user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data including stats
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      totalSolved: user.totalSolved || 0,
      streak: user.streak || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
