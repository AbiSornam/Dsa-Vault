const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { exportProblemsCSV } = require("../controllers/exportController");

const router = express.Router();

router.get("/problems/csv", authMiddleware, exportProblemsCSV);

module.exports = router;
