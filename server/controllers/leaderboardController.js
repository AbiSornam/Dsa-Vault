const Problem = require("../models/Problem");

exports.getLeaderboard = async (req, res) => {
  try {
    const User = require("../models/User"); // Ensure User model is loaded

    // 1. Global Stats
    const totalUsers = await User.countDocuments();
    const totalProblemsSolved = await Problem.countDocuments({ isSolved: true });
    
    // Active Today (users with recent problem activity)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeTodayVals = await Problem.distinct("userId", { updatedAt: { $gte: today } });
    const activeToday = activeTodayVals.length;

    // Avg Difficulty (Global)
    const difficultyStats = await Problem.aggregate([
       { $match: { isSolved: true } },
       { 
         $group: { 
            _id: null, 
            avgDiff: { 
               $avg: {
                 $cond: [
                   { $eq: ["$difficulty", "Easy"] }, 1,
                   { $cond: [{ $eq: ["$difficulty", "Medium"] }, 2, 3] }
                 ]
               }
            }
         } 
       }
    ]);
    const avgDiffScore = difficultyStats[0]?.avgDiff || 0;
    const avgDifficulty = avgDiffScore < 1.5 ? "Easy" : avgDiffScore < 2.5 ? "Medium" : "Hard";

    // 2. Leaderboard List
    const leaderboard = await Problem.aggregate([
      { $match: { isSolved: true } },
      {
        $group: {
          _id: "$userId",
          problemsSolved: { $sum: 1 },
          lastSolvedAt: { $max: "$lastSolvedAt" },
          totalDifficultyScore: {
             $sum: {
               $cond: [
                 { $eq: ["$difficulty", "Easy"] }, 1,
                 { $cond: [{ $eq: ["$difficulty", "Medium"] }, 2, 3] }
               ]
             }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userId: "$_id",
          name: "$userDetails.name",
          avatar: "$userDetails.avatar",
          problemsSolved: 1,
          avgDifficulty: {
            $let: {
               vars: { avgScore: { $divide: ["$totalDifficultyScore", "$problemsSolved"] } },
               in: {
                 $switch: {
                   branches: [
                     { case: { $lt: ["$$avgScore", 1.5] }, then: "Easy" },
                     { case: { $lt: ["$$avgScore", 2.5] }, then: "Medium" }
                   ],
                   default: "Hard"
                 }
               }
            }
          }
        }
      },
      { $sort: { problemsSolved: -1 } },
      { $limit: 10 }
    ]);

    const enrichedLeaderboard = leaderboard.map((u, i) => ({
      ...u,
      rank: i + 1,
      streak: Math.floor(Math.random() * 15) + 1, // Mock
      accuracy: `${Math.floor(Math.random() * 30) + 70}%` // Mock
    }));

    res.json({
        stats: {
            totalUsers,
            totalProblemsSolved,
            activeToday,
            avgDifficulty
        },
        leaderboard: enrichedLeaderboard
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
