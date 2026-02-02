const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    code: {
      type: String,
      required: true
    },

    // AI generated fields
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

    topic: {
      type: String,
      required: true
    },

    tags: [String],

    // ✅ IMPORTANT: solved status
    isSolved: {
      type: Boolean,
      default: false
    },

    // ✅ REQUIRED FOR STREAK LOGIC
    lastSolvedAt: {
      type: Date,
      default: null
    },

    // Optional AI analysis (future use)
    aiAnalysis: {
      optimizedApproach: String,
      mistakes: String,
      suggestions: String
    },

    // Revision reminder tracking
    revisionRemindersSent: {
      day4: {
        type: Boolean,
        default: false
      },
      day7: {
        type: Boolean,
        default: false
      }
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Problem", problemSchema);
