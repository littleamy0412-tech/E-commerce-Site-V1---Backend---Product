import { body, validationResult } from "express-validator";

const categoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default categoryValidator;
