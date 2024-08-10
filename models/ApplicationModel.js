import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    nationality: { type: String, required: true },
    destination_country: { type: String, required: true },
    visa_center: { type: String, required: true },
    visa_category: { type: String, required: true },
    visa_sub_category: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    migris_number: { type: String, required: true },
    passport_number: { type: String, required: true },
    passport_expiry: { type: Date, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phone: {
      dial_code: {
        type: Number,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model("Application", applicationSchema);
