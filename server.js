import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import { keys } from "./config/keys.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import visaRoutes from "./routes/visaRoutes.js";
import { authenticate, ensureAuth } from "./middlewares/authMiddlewares.js";

import "./services/passport.js";

const app = express();

// Morgan middleware for logging
app.use(morgan("dev"));

// Body parser middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CORS middleware
const allowedOrigins = [keys.clientUrl, "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`DB error: ${err}`);
  });

// Set up protected routes
app.use("/api", visaRoutes);
app.use("/api", authRoutes);
app.use("/api", sessionRoutes);
app.use("/api", ensureAuth, applicationRoutes);
app.use("/api", ensureAuth, bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
