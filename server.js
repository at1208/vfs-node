// server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "passport";
import { keys } from "./config/keys.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import "./services/passport.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Cookie session middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.secretKey],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up routes
app.use("/api", authRoutes);
app.use("/api", sessionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
