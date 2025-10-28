import express from "express";
import {
  getEntries,
  addEntry,
  deleteEntry,
} from "../controllers/entryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all entries for a user
router.get("/:userId", protect, getEntries);

// Add new entry for a user
router.post("/:userId", protect, addEntry);

// Delete entry by ID
router.delete("/:entryId", protect, deleteEntry);

export default router;
