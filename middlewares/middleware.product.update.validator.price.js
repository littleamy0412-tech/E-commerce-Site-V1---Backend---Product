import { body, validationResult } from "express-validator";

const productUpdatePriceValidator = [
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0.")
    .custom((value) => value >= 0)
    .withMessage("Price must be at least 0."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default productUpdatePriceValidator;
