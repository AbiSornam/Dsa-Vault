const Problem = require("../models/Problem");
const mongoose = require("mongoose");
// 1️⃣ Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user;

    const totalProblems = await Problem.countDocuments({ userId });

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const thisWeek = await Problem.countDocuments({
      userId,
      createdAt: { $gte: startOfWeek }
    });

    const difficultyStats = await Problem.aggregate([
      { $match: { userId } },
      { $group: { _id: "$difficulty", count: { $sum: 1 } } }
    ]);

    let easy = 0, medium = 0, hard = 0;
    difficultyStats.forEach(d => {
      if (d._id === "Easy") easy = d.count;
      if (d._id === "Medium") medium = d.count;
      if (d._id === "Hard") hard = d.count;
    });

    res.json({
      totalProblems,
      thisWeek,
      easy,
      medium,
      hard,
      avgTimeComplexity: "O(n log n)", // placeholder
      streak: 0 // placeholder (we’ll implement later)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Most Practiced Topics
exports.getTopicStats = async (req, res) => {
  try {
    const stats = await Problem.aggregate([
      { $match: { userId: req.user } },
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json(
      stats.map(s => ({ topic: s._id, count: s.count }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user;

    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - 7);

    const [
      totalProblems,
      solvedThisWeek,
      difficultyStats
    ] = await Promise.all([
      Problem.countDocuments({ userId }),

      Problem.countDocuments({
        userId,
        isSolved: true,
        lastSolvedAt: { $gte: startOfWeek }
      }),

      Problem.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: "$difficulty",
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    const difficultyCount = {
      easy: 0,
      medium: 0,
      hard: 0
    };

    difficultyStats.forEach(d => {
      difficultyCount[d._id.toLowerCase()] = d.count;
    });

    res.json({
      totalProblems,
      thisWeek: solvedThisWeek,
      easy: difficultyCount.easy,
      medium: difficultyCount.medium,
      hard: difficultyCount.hard
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getActivity = async (req, res) => {
  try {
    const { range } = req.query;

    const userId = new mongoose.Types.ObjectId(req.user);

    let startDate = new Date();

    if (range === "week") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === "month") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      return res.status(400).json({ error: "Invalid range" });
    }

    const problems = await Problem.find({
      userId,
      isSolved: true,
      lastSolvedAt: { $gte: startDate }
    });

    res.json({
      count: problems.length,
      problems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * COMPLEXITY TREND (MONTH-WISE)
 * GET /api/dashboard/complexity-trend
 */
exports.getComplexityTrend = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user);

    const trend = await Problem.aggregate([
      {
        $match: {
          userId,
          timeComplexity: { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.json(trend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// 3️⃣ Streak Calculation
exports.getStreak = async (req, res) => {
  try {
    const solvedProblems = await Problem.find({
      userId: req.user,
      isSolved: true,
      lastSolvedAt: { $ne: null }
    }).select("lastSolvedAt");

    if (solvedProblems.length === 0) {
      return res.json({ streak: 0 });
    }

    // Extract unique solved dates
    const solvedDates = new Set(
      solvedProblems.map(p =>
        new Date(p.lastSolvedAt).toDateString()
      )
    );

    let streak = 0;
    let currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toDateString();

      if (solvedDates.has(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
