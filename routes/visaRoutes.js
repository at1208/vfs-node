import express from "express";
import {
  createVisa,
  getVisas,
  updateVisaById,
  deleteVisaById,
} from "../controllers/visaController.js";
import { authenticate, ensureAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/visas", ensureAuth, createVisa);
router.get("/visas", ensureAuth, getVisas);
router.patch("/visas/:id", authenticate, updateVisaById);
router.delete("/visas/:id", ensureAuth, deleteVisaById);

export default router;
