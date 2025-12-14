const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request
    req.user = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
