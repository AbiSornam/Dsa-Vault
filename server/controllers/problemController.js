const Problem = require("../models/Problem");
const { generateExplanation } = require("../utils/gemini"); // ✅ ADD THIS

/**
 * CREATE PROBLEM
 */
exports.createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      intuition,
      timeComplexity,
      spaceComplexity,
      tags,
      topic,
      language,
      difficulty
    } = req.body;

    // 🔒 Validation at controller level (best practice)
    if (!title || !description || !code || !topic || !language || !difficulty) {
      return res.status(400).json({
        error: "Please provide all required fields"
      });
    }

    const problem = await Problem.create({
      title,
      description,
      code,
      intuition,
      timeComplexity,
      spaceComplexity,
      tags,
      topic,
      language,
      difficulty,
      userId: req.user
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.generateAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findOne({
      _id: id,
      userId: req.user
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Call AI
    const aiResult = await generateExplanation({
      question: problem.description,
      code: problem.code
       });

    // Update problem with AI results
    problem.intuition = aiResult.intuition;
    problem.timeComplexity = aiResult.timeComplexity;
    problem.spaceComplexity = aiResult.spaceComplexity;

    await problem.save();

    res.json({
      message: "AI analysis generated successfully",
      intuition: problem.intuition,
      timeComplexity: problem.timeComplexity,
      spaceComplexity: problem.spaceComplexity
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * UPDATE PROBLEM
 */
exports.updateProblem = async (req, res) => {
  try {
    const problemId = req.params.id;

    const problem = await Problem.findOne({
      _id: problemId,
      userId: req.user
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // update only fields sent from frontend
    Object.assign(problem, req.body);

    await problem.save();

    res.json({
      message: "Problem updated successfully",
      problem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * FILTER PROBLEMS
 * GET /api/problems?difficulty=&topic=&language=&isSolved=
 */
exports.filterProblems = async (req, res) => {
  try {
    const { difficulty, topic, language, isSolved } = req.query;

    const filter = {
      userId: req.user
    };

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (language) filter.language = language;
    if (isSolved !== undefined) filter.isSolved = isSolved === "true";

    const problems = await Problem.find(filter).sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * SEARCH PROBLEMS
 * GET /api/problems/search?q=keyword
 */
exports.searchProblems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const problems = await Problem.find({
      userId: req.user,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { topic: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * GET ALL PROBLEMS OF LOGGED-IN USER
 */
exports.getMyProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFolders = async (req, res) => {
  try {
    const folders = await Problem.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user) } },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          topic: "$_id",
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * GET FOLDERS / TOPIC STATS
 * GET /api/problems/folders
 */
const mongoose = require("mongoose");

exports.getFolders = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user);

    const folders = await Problem.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          topic: "$_id",
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



