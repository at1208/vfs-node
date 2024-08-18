import mongoose from "mongoose";

const { Schema } = mongoose;

const counterSchema = new Schema({
  _id: String,
  sequence_value: Number,
});

const Counter = mongoose.model("Counter", counterSchema);

const visaSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    visa_center: {
      type: String,
      required: true,
    },
    visa_category: {
      type: String,
      required: true,
    },
    visa_sub_category: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

visaSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "visa_id" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      this.id = `VISA_${String(counter.sequence_value).padStart(3, "0")}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export const Visa = mongoose.model("Visa", visaSchema);
