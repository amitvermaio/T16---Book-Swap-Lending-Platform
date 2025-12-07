import { body } from "express-validator";

export const createRequestValidation = [
  body("bookId")
    .notEmpty().withMessage("bookId is required"),

  body("type")
    .notEmpty().withMessage("type is required")
    .isIn(["borrow", "swap", "donate"])
    .withMessage("Invalid request type"),
];

export const updateRequestStatusValidation = [
  body("action")
    .notEmpty().withMessage("action is required")
    .isIn(["approve", "reject", "cancel"])
    .withMessage("action must be approve/reject/cancel"),
];
