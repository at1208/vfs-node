import { Application } from "../models/ApplicationModel.js";
import { validationResult } from "express-validator";

// Create a new application
export const createApplication = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: false, errors: errors.array(), data: [] });
  }

  try {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.status(200).json({ status: true, errors: [], data: savedApplication });
  } catch (error) {
    res.status(400).json({
      status: false,
      errors: Object.keys(error.errors).map((err) => error.errors[err]),
      data: [],
    });
  }
};

// Get applications with optional query filters or by ID
export const getApplications = async (req, res) => {
  try {
    const { id, ...query } = req.query;

    let applications;

    if (id) {
      applications = await Application.findById(id);
      if (!applications) {
        return res.status(404).json({
          status: false,
          errors: [{ msg: "Application not found" }],
          data: [],
        });
      }
      return res
        .status(200)
        .json({ status: true, errors: [], data: applications });
    }

    applications = await Application.find(query);
    res.status(200).json({ status: true, errors: [], data: applications });
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
