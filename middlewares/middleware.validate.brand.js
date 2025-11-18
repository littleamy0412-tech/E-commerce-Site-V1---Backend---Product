import { body, validationResult } from "express-validator";

const brandValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default brandValidator;
