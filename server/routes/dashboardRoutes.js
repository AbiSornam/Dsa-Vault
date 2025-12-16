const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardSummary,
  getTopicStats,
  getStreak,
  getActivity,
  getComplexityTrend // add this
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard summary
router.get("/summary", authMiddleware, getDashboardSummary);

// Most practiced topics
router.get("/topics", authMiddleware, getTopicStats);


// Streak endpoint
router.get("/streak", authMiddleware, getStreak);
router.get("/summary", authMiddleware, getDashboardSummary);
router.get("/activity", authMiddleware, getActivity);
router.get("/complexity-trend", authMiddleware, getComplexityTrend);
module.exports = router;
