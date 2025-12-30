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
    .notEmpty().withMessage("Action is required")
    .isIn(['pending', 'approved', 'rejected', 'cancelled', 'completed'])
    .withMessage("Invalid action status"),

  body("pickupInfo")
    .if(body("action").equals("approved"))
    .notEmpty().withMessage("Pickup information is required when approving")
    .isObject().withMessage("pickupInfo must be an object"),

  body("pickupInfo.location")
    .if(body("action").equals("approved"))
    .notEmpty().withMessage("Pickup location is required")
    .isString().withMessage("Location must be a text string")
    .trim()
    .isLength({ min: 3 }).withMessage("Location is too short"),

  body("pickupInfo.datetime")
    .if(body("action").equals("approved"))
    .notEmpty().withMessage("Pickup date/time is required")
    .isISO8601().withMessage("Invalid date format (Must be ISO8601)")
    .toDate(),

  body("pickupInfo.note")
    .if(body("action").equals("approved"))
    .notEmpty().withMessage("A note for the borrower is required")
    .isString().withMessage("Note must be text")
    .trim(),
];
