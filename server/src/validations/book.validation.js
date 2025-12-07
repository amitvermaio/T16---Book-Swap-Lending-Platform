import { body } from "express-validator";

export const createBookValidation = [
  body("title")
    .notEmpty().withMessage("Title is required"),

  body("availabilityType")
    .notEmpty().withMessage("availabilityType is required")
    .isIn(["lend", "swap", "donate"])
    .withMessage("availabilityType must be lend/swap/donate"),
];

export const updateBookValidation = [
  body("availabilityType")
    .optional()
    .isIn(["lend", "swap", "donate"])
    .withMessage("availabilityType must be lend/swap/donate"),
];
