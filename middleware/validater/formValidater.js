const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../../helpers/response/allResponse.js");
const errorMessages = require("../../helpers/messages/errorMessages.js");


const registerValidationRules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage(errorMessages?.ERROR003),

  body("email")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isEmail()
    .withMessage(errorMessages?.ERROR004)
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isLength({ min: 6 })
    .withMessage(errorMessages?.ERROR005),
];



const loginValidationRules = [
  body("email")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002) // Missing field error
    .isEmail()
    .withMessage(errorMessages?.ERROR004) // Invalid email error
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002), // Missing field error
];

// Global wrapper to catch and send errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Returns the first error code found in the validation chain
  const firstError = errors.array()[0].msg;
  return errorResponse(res, firstError, 400);
};

module.exports = {
  registerValidationRules,
  loginValidationRules, // Export the new rules
  validate,
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




import { body, validationResult } from "express-validator";
import { errorResponse } from "../../helpers/response/allResponse.js";
import errorMessages from "../../helpers/messages/errorMessages.js";

// Registration validation rules

export const registerValidationRules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage(errorMessages?.ERROR003),

  body("email")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isEmail()
    .withMessage(errorMessages?.ERROR004)
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isLength({ min: 6 })
    .withMessage(errorMessages?.ERROR005),
];

// Login validation rules

export const loginValidationRules = [
  body("email")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002)
    .isEmail()
    .withMessage(errorMessages?.ERROR004)
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(errorMessages?.ERROR002),
];

// Global validation runner middleware

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const firstError = errors.array()[0].msg;
  return errorResponse(res, firstError, 400);
};