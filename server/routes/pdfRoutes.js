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

/**
 * EXPORT SINGLE PROBLEM AS PDF
 * GET /api/export/problems/:id/pdf
 */
router.get("/problems/:id/pdf", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${problem.title.replace(/\s+/g, '-')}.pdf`
    );

    doc.pipe(res);

    // PDF Title
    doc.fontSize(20).text(problem.title, { align: "center" });
    doc.moveDown(1);
    
    // Metadata
    doc.fontSize(10)
      .fillColor('#666666')
      .text(`Topic: ${problem.topic} | Difficulty: ${problem.difficulty} | Language: ${problem.language}`, { align: "center" });
    doc.fillColor('#000000');
    doc.moveDown(2);

    // Description
    doc.fontSize(14).text("Problem Description", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11).text(problem.description || "—");
    doc.moveDown(1.5);

    // Code
    doc.fontSize(14).text("Solution Code", { underline: true });
    doc.moveDown(0.5);
    doc.font("Courier").fontSize(9).text(problem.code || "—");
    doc.font("Helvetica");
    doc.moveDown(1.5);

    // Intuition
    if (problem.intuition) {
      doc.fontSize(14).text("Intuition", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).text(problem.intuition);
      doc.moveDown(1.5);
    }

    // Complexity Analysis
    doc.fontSize(14).text("Complexity Analysis", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11)
      .text(`Time Complexity: ${problem.timeComplexity || "—"}`)
      .text(`Space Complexity: ${problem.spaceComplexity || "—"}`);
    doc.moveDown(1);

    // Tags
    if (problem.tags && problem.tags.length > 0) {
      doc.fontSize(14).text("Tags", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).text(problem.tags.join(", "));
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
