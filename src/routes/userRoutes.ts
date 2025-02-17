import express, { Request, Response } from "express";
import {
//   changePassword,
  // forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  // resetPassword,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
} from "../controller/userController";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware";
import {
  deleteUser,
  getAllUsers,
} from "../controller/adminController";

// Define the express router
const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

// Admin routes
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

// Authentication and User Status
router.get("/login-status", userLoginStatus);

// Email Verification
router.post("/verify-email", protect, verifyEmail);

// Verify User (for email verification)
router.post("/verify-user/:verificationToken", verifyUser);

// Forgot Password
// router.post("/forgot-password", forgotPassword);

// // Reset Password
// router.post("/reset-password/:resetPasswordToken", resetPassword);

// Change Password (user must be logged in)
// router.patch("/change-password", protect, changePassword);

export default router;
