const Problem = require("../models/Problem");
const { Parser } = require("json2csv");

exports.exportProblemsCSV = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user }).select(
      "title topic difficulty language timeComplexity spaceComplexity isSolved"
    );

    const fields = [
      "title",
      "topic",
      "difficulty",
      "language",
      "timeComplexity",
      "spaceComplexity",
      "isSolved"
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(problems);

    res.header("Content-Type", "text/csv");
    res.attachment("dsa-vault-problems.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
