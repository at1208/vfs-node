import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
});

export const User = mongoose.model("User", userSchema);
