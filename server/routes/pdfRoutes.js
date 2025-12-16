const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Problem = require("../models/Problem");
const PDFDocument = require("pdfkit");

const router = express.Router();

/**
 * EXPORT PROBLEMS AS PDF
 * GET /api/export/problems/pdf
 */
router.get("/problems/pdf", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user }).sort({
      createdAt: -1
    });

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=dsa-vault-problems.pdf"
    );

    doc.pipe(res);

    // PDF Title
    doc.fontSize(20).text("DSA Vault – My Problems", { align: "center" });
    doc.moveDown(2);

    problems.forEach((problem, index) => {
      doc
        .fontSize(14)
        .text(`${index + 1}. ${problem.title}`, { underline: true });

      doc.moveDown(0.5);
      doc.fontSize(10).text(`Topic: ${problem.topic}`);
      doc.text(`Difficulty: ${problem.difficulty}`);
      doc.text(`Language: ${problem.language}`);
      doc.text(`Solved: ${problem.isSolved ? "Yes" : "No"}`);
      doc.moveDown(0.5);

      doc.fontSize(12).text("Description:");
      doc.fontSize(10).text(problem.description || "—");
      doc.moveDown(0.5);

      doc.fontSize(12).text("Code:");
      doc.font("Courier").fontSize(9).text(problem.code || "—");
      doc.font("Helvetica");
      doc.moveDown(0.5);

      doc.fontSize(12).text("Intuition:");
      doc.fontSize(10).text(problem.intuition || "—");
      doc.moveDown(0.5);

      doc.fontSize(10).text(
        `Time: ${problem.timeComplexity || "—"} | Space: ${
          problem.spaceComplexity || "—"
        }`
      );

      doc.moveDown(2);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
