// middleware/auth.js
export const ensureAuth = (req, res, next) => {
  console.log({ req });
  if (req?.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      message: "Unauthorized: Please log in to access this resource.",
    });
  }
};

export const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/dashboard");
  }
};

const SECRET_KEY = process.env.SECRETKEY;

export const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization !== `Bearer ${SECRET_KEY}`) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or missing secret key" });
  }
  next();
};
