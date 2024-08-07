import express from "express";
import { ensureAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/session", ensureAuth, (req, res) => {
  res.json({ message: "Active session", user: req.user });
});

export default router;
