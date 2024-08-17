import passport from "passport";
// controllers/authController.js

// Initiates the Google authentication process
export const googleAuthController = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

// Handles the callback from Google and redirects to the profile page
export const googleAuthCallbackController = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("http://localhost:3000/applications");
    });
  })(req, res, next);
};

// Logs out the user and redirects to the home page
export const logoutController = (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
};
