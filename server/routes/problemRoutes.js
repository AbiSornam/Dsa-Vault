const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getFolders
} = require("../controllers/problemController");
const { generateAnalysis } = require("../controllers/problemController");

const Problem = require("../models/Problem");
const { generateExplanation } = require("../utils/gemini");

const router = express.Router();

/* ======================================================
   CREATE PROBLEM
====================================================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, code, tags, topic, language, difficulty } = req.body;

    if (!title || !description || !code || !topic || !language || !difficulty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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
   FOLDERS / TOPIC STATS  ⭐⭐
   GET /api/problems/folders
====================================================== */
router.get("/folders", authMiddleware, getFolders);

/* ======================================================
   RECENT PROBLEMS
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
   SEARCH
====================================================== */
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Search query required" });

    const problems = await Problem.find({
      userId: req.user,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { topic: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ]
    });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   FILTER
====================================================== */
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const { difficulty, topic, language, isSolved } = req.query;

    const filter = { userId: req.user };
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (language) filter.language = language;
    if (isSolved !== undefined) filter.isSolved = isSolved === "true";

    const problems = await Problem.find(filter);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   TOGGLE SOLVED
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

    if (problem.isSolved) {
      problem.lastSolvedAt = new Date(); // ✅ FIX
    } else {
      problem.lastSolvedAt = null;
    }

    await problem.save();

    res.json({
      message: "Problem status updated",
      isSolved: problem.isSolved,
      lastSolvedAt: problem.lastSolvedAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ======================================================
   UPDATE
====================================================== */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Problem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Problem not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   DELETE
====================================================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Problem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!deleted) return res.status(404).json({ error: "Problem not found" });
    res.json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post(
  "/:id/generate-analysis",
  authMiddleware,
  generateAnalysis
);

/* ======================================================
   GET ALL
====================================================== */
router.get("/", authMiddleware, async (req, res) => {
  const problems = await Problem.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(problems);
});

// DEBUG: List all problems for the current user
router.get("/debug/all", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEBUG: Mark a problem as solved for activity testing
router.post("/debug/mark-solved/:id", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { isSolved: true, lastSolvedAt: new Date() },
      { new: true }
    );
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEBUG: Create a solved problem for activity testing
router.post("/debug/create-solved", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.create({
      title: "Debug Solved Problem",
      description: "This is a debug problem to test activity endpoint.",
      code: "function debug() { return true; }",
      intuition: "Debug intuition",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      tags: ["debug"],
      topic: "Debug",
      language: "JavaScript",
      difficulty: "Easy",
      isSolved: true,
      lastSolvedAt: new Date(),
      userId: req.user
    });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single problem by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.id, userId: req.user });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
