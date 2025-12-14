const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },

  intuition: String,
  timeComplexity: String,
  spaceComplexity: String,

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },

  language: {
    type: String,
    enum: ["Java", "Python", "JavaScript", "C++"],
    required: true
  },

  topic: { type: String, required: true },
  tags: [String],

  isSolved: { type: Boolean, default: true },

  aiAnalysis: {
    optimizedApproach: String,
    mistakes: String,
    suggestions: String
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
