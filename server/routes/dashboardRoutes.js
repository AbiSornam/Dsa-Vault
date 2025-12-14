const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardSummary,
  getTopicStats
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard summary
router.get("/summary", authMiddleware, getDashboardSummary);

// Most practiced topics
router.get("/topics", authMiddleware, getTopicStats);

module.exports = router;
