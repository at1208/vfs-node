import { check } from "express-validator";

export const applicationValidationRules = [
  check("nationality").notEmpty().withMessage("Nationality is required"),
  check("destination_country")
    .notEmpty()
    .withMessage("Destination country is required"),
  check("visa_center").notEmpty().withMessage("Visa center is required"),
  check("visa_category").notEmpty().withMessage("Visa category is required"),
  check("visa_sub_category")
    .notEmpty()
    .withMessage("Visa sub-category is required"),
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").notEmpty().withMessage("Last name is required"),
  check("migris_number").notEmpty().withMessage("Migris number is required"),
  check("passport_number")
    .notEmpty()
    .withMessage("Passport number is required"),
  check("passport_expiry")
    .isISO8601()
    .withMessage("Passport expiry date must be a valid date")
    .notEmpty()
    .withMessage("Passport expiry date is required"),
  check("dob")
    .isISO8601()
    .withMessage("Date of birth must be a valid date")
    .notEmpty()
    .withMessage("Date of birth is required"),
  check("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be 'Male', 'Female', or 'Other'")
    .notEmpty()
    .withMessage("Gender is required"),
  check("phone.dial_code")
    .isInt()
    .withMessage("Phone dial code must be an integer")
    .notEmpty()
    .withMessage("Phone dial code is required"),
  check("phone.number")
    .isInt()
    .withMessage("Phone number must be an integer")
    .notEmpty()
    .withMessage("Phone number is required"),
  check("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
];
