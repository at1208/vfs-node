import { Visa } from "../models/VisaModel.js";

// Create a new visa
export const createVisa = async (req, res) => {
  const errors = [];
  try {
    const visa = new Visa(req.body);
    await visa.save();
    res.status(200).json({
      status: true,
      errors,
      data: visa,
    });
  } catch (error) {
    errors.push(error);
    res.status(400).json({
      status: false,
      errors,
      data: null,
    });
  }
};

// Get visas with optional filtering by ID
export const getVisas = async (req, res) => {
  const { id } = req.query;
  const errors = [];

  try {
    if (id) {
      // Get a single visa by ID
      const visa = await Visa.findOne({ id });
      if (!visa) {
        errors.push("Visa not found");
        return res.status(404).json({
          status: false,
          errors,
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        errors,
        data: visa,
      });
    } else {
      // Get all visas
      const visas = await Visa.find();
      return res.status(200).json({
        status: true,
        errors,
        data: visas,
      });
    }
  } catch (error) {
    errors.push(error);
    res.status(400).json({
      status: false,
      errors,
      data: null,
    });
  }
};

// Update a visa by ID
export const updateVisaById = async (req, res) => {
  const errors = [];
  try {
    const visa = await Visa.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!visa) {
      errors.push("Visa not found");
      return res.status(404).json({
        status: false,
        errors,
        data: null,
      });
    }
    res.status(200).json({
      status: true,
      errors,
      data: visa,
    });
  } catch (error) {
    errors.push(error);
    res.status(400).json({
      status: false,
      errors,
      data: null,
    });
  }
};

// Delete a visa by ID
export const deleteVisaById = async (req, res) => {
  const errors = [];
  try {
    const visa = await Visa.findOneAndDelete({ id: req.params.id });
    if (!visa) {
      errors.push("Visa not found");
      return res.status(404).json({
        status: false,
        errors,
        data: null,
      });
    }
    res.status(200).json({
      status: true,
      errors,
      data: { message: "Visa deleted successfully" },
    });
  } catch (error) {
    errors.push(error);
    res.status(400).json({
      status: false,
      errors,
      data: null,
    });
  }
};
