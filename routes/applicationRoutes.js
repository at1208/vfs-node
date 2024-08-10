import express from "express";
import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Route for creating a new application
router.post("/application", createApplication);

router.get("/application", getApplications);

// Route for updating an application by ID
router.patch("/application/:id", updateApplication);

// Route for deleting an application by ID
router.delete("/application/:id", deleteApplication);

export default router;
