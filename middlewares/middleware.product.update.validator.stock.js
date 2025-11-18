import { body, validationResult } from "express-validator";

const productUpdateStockValidator = [
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0.")
    .custom((value) => value >= 0)
    .withMessage("Stock must be at least 0."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default productUpdateStockValidator;
