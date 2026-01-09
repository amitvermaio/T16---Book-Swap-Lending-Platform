import { body } from "express-validator";

export const createBookValidation = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .trim()
    .isLength({ min: 2 }).withMessage("Title must be at least 2 characters"),

  body("author")
    .notEmpty().withMessage("Author is required")
    .trim(),
  body("availabilityType")
    .notEmpty().withMessage("availabilityType is required")
    .custom((value) => {
      let types = value;
      // If It's a JSON string (e.g. '["swap","lend"]')
      if (typeof value === 'string' && value.startsWith('[')) {
        try {
          types = JSON.parse(value);
        } catch (err) {
          throw new Error("Invalid format for availabilityType");
        }
      }

      // If It's a single string (e.g. "swap") -> Convert to Array
      if (!Array.isArray(types)) {
        types = [types];
      }

      // Check if ALL items in the array are valid
      const validOptions = ["borrow", "swap", "donate"];
      const invalidItems = types.filter(item => !validOptions.includes(item));

      if (invalidItems.length > 0) {
        throw new Error(`Invalid values found: ${invalidItems.join(", ")}. Allowed: borrow, swap, donate`);
      }

      return true;
    }),
  
  body('condition')
    .notEmpty().withMessage('Condition of book required!')
    .isIn(['new', 'like_new', 'good', 'fair']).withMessage('Invalid Value')
];

export const updateBookValidation = [
  body("title").optional().trim().notEmpty(),
  body("author").optional().trim().notEmpty(),
  
  body("availabilityType")
    .optional()
    .custom((value) => {
      let types = value;
      if (typeof value === 'string' && value.startsWith('[')) {
        try { types = JSON.parse(value); } catch (e) { throw new Error("Invalid JSON"); }
      }
      if (!Array.isArray(types)) types = [types];

      const validOptions = ["borrow", "swap", "donate"];
      const invalidItems = types.filter(item => !validOptions.includes(item));

      if (invalidItems.length > 0) {
        throw new Error("Must be lend, swap, or donate");
      }
      return true;
    }),
];