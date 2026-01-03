import express from "express";
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  getUserProfile,
  toggleBookmark,
  updateProgress,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// User Profile & Progress
router.get("/profile", protect, getUserProfile);
router.post("/bookmark/:id", protect, toggleBookmark);
router.post("/progress", protect, updateProgress);

export default router;
