import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/user.controllers.js";
import protect from "../Middleware/auth.Middleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
