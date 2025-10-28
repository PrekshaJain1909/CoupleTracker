import express from "express";
import { getTotals, getDailyStats } from "../controllers/statsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get total counts (Pie chart)
router.get("/totals/:userId", protect, getTotals);

// Get daily aggregated stats (Bar/Line charts)
router.get("/daily/:userId", protect, getDailyStats);

export default router;
