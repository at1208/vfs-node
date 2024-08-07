// routes/auth.js
import express from "express";
import {
  googleAuthController,
  googleAuthCallbackController,
  logoutController,
} from "../controllers/authController.js";

const router = express.Router();

// Start Google authentication
router.get("/google", googleAuthController);

// Callback route for Google to redirect to after authentication
router.get("/google/callback", googleAuthCallbackController);

// Logout route
router.get("/logout", logoutController);

export default router;
