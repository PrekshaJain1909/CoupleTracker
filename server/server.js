import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(cors());

// =======================
// ROUTES
// =======================
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/stats", statsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// =======================
// ERROR HANDLER
// =======================
app.use(errorHandler);

// =======================
// DATABASE CONNECTION
// =======================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
