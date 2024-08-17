import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { keys } from "../config/keys.js";
import { User } from "../models/UserModel.js";

// Define the list of allowed email addresses
const allowedEmails = ["mailmeaktiwari@gmail.com"];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      // Check if the email is in the allowed list
      if (!allowedEmails.includes(email)) {
        // Send a response with an access denied message
        return done(null, false, {
          message: "Access denied: Your email is not authorized.",
        });
      }

      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            avatar: profile.photos[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
