import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Define routes
router.post("/booking", createBooking);
router.get("/booking", getBookings);
router.patch("/booking/:id", updateBooking);
router.delete("/booking/:id", deleteBooking);

export default router;
