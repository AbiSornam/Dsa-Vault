const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Problem = require("../models/Problem");
const { generateExplanation } = require("../utils/gemini");

const router = express.Router();

/* ======================================================
   CREATE PROBLEM (with AI explanation)
   POST /api/problems
====================================================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      tags,
      topic,
      language,
      difficulty
    } = req.body;

    // Basic validation
    if (!title || !description || !code || !topic || !language || !difficulty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // AI Explanation
    const aiExplanation = await generateExplanation({
      question: description,
      code
    });

    const problem = await Problem.create({
      title,
      description,
      code,
      intuition: aiExplanation.intuition,
      timeComplexity: aiExplanation.timeComplexity,
      spaceComplexity: aiExplanation.spaceComplexity,
      tags,
      topic,
      language,
      difficulty,
      userId: req.user
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   GET RECENT PROBLEMS (Dashboard)
   GET /api/problems/recent?limit=5
====================================================== */
router.get("/recent", authMiddleware, async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const recentProblems = await Problem.find({ userId: req.user })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title difficulty topic tags isSolved createdAt");

    res.json(recentProblems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   SEARCH PROBLEMS
   GET /api/problems/search?q=binary
====================================================== */
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({ error: "Search query required" });
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   FILTER PROBLEMS
   GET /api/problems/filter?difficulty=Easy&topic=Arrays
====================================================== */
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const { difficulty, topic, language, isSolved } = req.query;

    const filter = { userId: req.user };

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (language) filter.language = language;
    if (isSolved !== undefined) filter.isSolved = isSolved === "true";

    const problems = await Problem.find(filter).sort({ createdAt: -1 });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   TOGGLE SOLVED / UNSOLVED
   PATCH /api/problems/:id/toggle-solved
====================================================== */
router.patch("/:id/toggle-solved", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    problem.isSolved = !problem.isSolved;
    await problem.save();

    res.json({
      message: "Problem status updated",
      isSolved: problem.isSolved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   UPDATE PROBLEM
   PUT /api/problems/:id
====================================================== */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProblem = await Problem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json(updatedProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   DELETE PROBLEM
   DELETE /api/problems/:id
====================================================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Problem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!deleted) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   GET ALL PROBLEMS (Default)
   GET /api/problems
====================================================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user })
      .sort({ createdAt: -1 });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
