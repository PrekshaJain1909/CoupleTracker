import express from "express";
import {
  getProfile,
  updateProfile,
  loginUser,
  registerUser,
  googleLogin,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------- AUTH --------------------

// Login
router.post("/auth/login", loginUser);

// Register (optional)
router.post("/auth/register", registerUser);

// Google OAuth login
router.post("/auth/google", googleLogin);

// -------------------- USER PROFILE --------------------

// Get user profile
router.get("/:userId", protect, getProfile);

// Update user profile
router.put("/:userId", protect, updateProfile);

export default router;
