const Problem = require("../models/Problem");

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
