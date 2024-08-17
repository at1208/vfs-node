import { check } from "express-validator";

const applicationValidationRules = [
  check("applications").isArray().withMessage("Applications must be an array"),
  check("applications.*.nationality")
    .notEmpty()
    .withMessage("Nationality is required"),
  check("applications.*.destination_country")
    .notEmpty()
    .withMessage("Destination country is required"),
  check("applications.*.visa_center")
    .notEmpty()
    .withMessage("Visa center is required"),
  check("applications.*.visa_category")
    .notEmpty()
    .withMessage("Visa category is required"),
  check("applications.*.visa_sub_category")
    .notEmpty()
    .withMessage("Visa sub-category is required"),
  check("applications.*.first_name")
    .notEmpty()
    .withMessage("First name is required"),
  check("applications.*.last_name")
    .notEmpty()
    .withMessage("Last name is required"),
  check("applications.*.migris_number")
    .notEmpty()
    .withMessage("Migris number is required"),
  check("applications.*.passport_number")
    .notEmpty()
    .withMessage("Passport number is required"),
  check("applications.*.passport_expiry")
    .isISO8601()
    .withMessage("Passport expiry date must be a valid date")
    .notEmpty()
    .withMessage("Passport expiry date is required"),
  check("applications.*.dob")
    .isISO8601()
    .withMessage("Date of birth must be a valid date")
    .notEmpty()
    .withMessage("Date of birth is required"),
  check("applications.*.gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage('Gender must be "Male", "Female", or "Other"')
    .notEmpty()
    .withMessage("Gender is required"),
  check("applications.*.phone.dial_code")
    .isInt()
    .withMessage("Phone dial code must be an integer")
    .notEmpty()
    .withMessage("Phone dial code is required"),
  check("applications.*.phone.number")
    .isInt()
    .withMessage("Phone number must be an integer")
    .notEmpty()
    .withMessage("Phone number is required"),
  check("applications.*.email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
];
