const Problem = require("../models/Problem");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Problem.aggregate([
      { $match: { isSolved: true } },

      {
        $group: {
          _id: "$userId",
          problemsSolved: { $sum: 1 },

          avgDifficulty: {
            $avg: {
              $cond: [
                { $eq: ["$difficulty", "Easy"] }, 1,
                { $cond: [{ $eq: ["$difficulty", "Medium"] }, 2, 3] }
              ]
            }
          },

          lastSolvedAt: { $max: "$lastSolvedAt" }
        }
      },

      {
        $project: {
          userId: "$_id",
          problemsSolved: 1,
          avgDifficulty: {
            $switch: {
              branches: [
                { case: { $lt: ["$avgDifficulty", 1.5] }, then: "Easy" },
                { case: { $lt: ["$avgDifficulty", 2.5] }, then: "Medium" }
              ],
              default: "Hard"
            }
          }
        }
      },

      { $sort: { problemsSolved: -1 } },
      { $limit: 10 }
    ]);

    // ⚠️ Mock accuracy & streak (allowed as per your plan)
    const enriched = leaderboard.map((u, i) => ({
      rank: i + 1,
      userId: u.userId,
      problemsSolved: u.problemsSolved,
      avgDifficulty: u.avgDifficulty,
      streak: Math.floor(Math.random() * 15) + 1,
      accuracy: `${Math.floor(Math.random() * 30) + 70}%`
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
