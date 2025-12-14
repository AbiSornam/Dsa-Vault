const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); // 👈 VERY IMPORTANT
const problemRoutes = require("./routes/problemRoutes");

const app = express();

connectDB(); // 👈 This is what was failing

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes); // This line mounts the route


app.use("/api/problems", problemRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));



app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
