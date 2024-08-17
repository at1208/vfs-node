import { Application } from "../models/ApplicationModel.js";
import { validationResult } from "express-validator";
import { Booking } from "../models/BookingModel.js";

// Create a new application
export const createApplication = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: false, errors: errors.array(), data: [] });
  }

  try {
    const applications = req.body; // Expecting an array of application objects

    if (!Array.isArray(applications)) {
      return res
        .status(400)
        .json({ status: false, errors: ["Invalid data format"], data: [] });
    }

    // Create a bulk insert
    const savedApplications = await Application.insertMany(applications, {
      rawResult: true,
    });

    res.status(200).json({ status: true, errors: [], data: savedApplications });
  } catch (error) {
    res.status(400).json({
      status: false,
      errors: Object.keys(error.errors || {}).map(
        (err) => error.errors[err].message
      ),
      data: [],
    });
  }
};

// Get applications with optional query filters or by ID
export const getApplications = async (req, res) => {
  try {
    const { id, search, ...query } = req.query;

    let applications;
    let bookings;
    let response;

    // If an id is provided, fetch the specific application
    if (id) {
      applications = await Application.findById(id);
      if (!applications) {
        return res.status(404).json({
          status: false,
          errors: [{ msg: "Application not found" }],
          data: [],
        });
      }

      // Fetch bookings related to this specific application
      bookings = await Booking.find({ application_id: id }).select("slot");
      // Combine application data with booking slots
      response = {
        ...applications.toObject(),
        bookings: bookings.map((b) => b.slot),
      };

      return res.status(200).json({
        status: true,
        errors: [],
        data: response,
      });
    }

    // Build the search query if search parameter is provided
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { nationality: { $regex: search, $options: "i" } },
          { visa_center: { $regex: search, $options: "i" } },
          { visa_category: { $regex: search, $options: "i" } },
          { passport_number: { $regex: search, $options: "i" } },
          { gender: { $regex: search, $options: "i" } },
          { migris_number: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Combine the search query with other query parameters
    const combinedQuery = { ...query, ...searchQuery };

    // Fetch applications based on the combined query
    applications = await Application.find(combinedQuery);
    const applicationIds = applications.map((app) => app._id);

    // Fetch bookings for the retrieved applications
    bookings = await Booking.find({
      application_id: { $in: applicationIds },
    }).select("application_id slot");

    // Group bookings by application_id
    const bookingsByApplicationId = bookings.reduce((acc, booking) => {
      if (!acc[booking.application_id]) {
        acc[booking.application_id] = [];
      }
      acc[booking.application_id].push(booking.slot);
      return acc;
    }, {});

    // Attach slots to each application
    response = applications.map((app) => ({
      ...app.toObject(),
      slot: bookingsByApplicationId[app._id]?.[0] || null,
    }));

    res.status(200).json({
      status: true,
      errors: [],
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      errors: [{ msg: error.message }],
      data: [],
    });
  }
};

// Update an application by ID
export const updateApplication = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: false, errors: errors.array(), data: [] });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({
        status: false,
        errors: [{ msg: "Application not found" }],
        data: [],
      });
    }
    res
      .status(200)
      .json({ status: true, errors: [], data: updatedApplication });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, errors: [{ msg: error.message }], data: [] });
  }
};

// Delete an application by ID
export const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication) {
      return res.status(404).json({
        status: false,
        errors: [{ msg: "Application not found" }],
        data: [],
      });
    }
    res.status(200).json({
      status: true,
      errors: [],
      data: { message: "Application deleted" },
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, errors: [{ msg: error.message }], data: [] });
  }
};
