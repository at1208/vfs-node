import { Booking } from "../models/BookingModel.js";
import { Application } from "../models/ApplicationModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { application_id, slot } = req.body;

    // Check if the application exists
    const application = await Application.findById(application_id);
    if (!application) {
      return res
        .status(404)
        .json({ status: false, errors: ["Application not found"], data: [] });
    }

    const booking = new Booking({ application_id, slot });
    await booking.save();

    res.status(201).json({ status: true, errors: [], data: [booking] });
  } catch (error) {
    res.status(500).json({ status: false, errors: [error.message], data: [] });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { id } = req.params;

    // If an ID is provided, fetch a single booking
    if (id) {
      const booking = await Booking.findById(id).populate("application_id");
      if (!booking) {
        return res
          .status(404)
          .json({ status: false, errors: ["Booking not found"], data: [] });
      }
      return res
        .status(200)
        .json({ status: true, errors: [], data: [booking] });
    }

    // If no ID is provided, fetch all bookings
    const bookings = await Booking.find().populate("application_id");
    res.status(200).json({ status: true, errors: [], data: bookings });
  } catch (error) {
    res.status(500).json({ status: false, errors: [error.message], data: [] });
  }
};

// Update a booking by ID
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("application_id");
    if (!booking) {
      return res
        .status(404)
        .json({ status: false, errors: ["Booking not found"], data: [] });
    }

    res.status(200).json({ status: true, errors: [], data: [booking] });
  } catch (error) {
    res.status(500).json({ status: false, errors: [error.message], data: [] });
  }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res
        .status(404)
        .json({ status: false, errors: ["Booking not found"], data: [] });
    }

    res.status(200).json({ status: true, errors: [], data: [] });
  } catch (error) {
    res.status(500).json({ status: false, errors: [error.message], data: [] });
  }
};
