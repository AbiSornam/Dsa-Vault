const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getLeaderboard } = require("../controllers/LeaderboardController");

const router = express.Router();

router.get("/", authMiddleware, getLeaderboard);

module.exports = router;
