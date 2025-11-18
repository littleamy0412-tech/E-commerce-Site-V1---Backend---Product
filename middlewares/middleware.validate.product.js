import Joi from "joi";

const productValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),

  description: Joi.string().trim().required().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price should be a number",
    "number.min": "Price should be at least 0",
    "any.required": "Price is required",
  }),

  category: Joi.string().hex().length(24).optional().messages({
    "string.base": "Category should be a string",
    "string.hex": "Category should be a valid ObjectId",
    "string.length": "Category should be a valid ObjectId",
  }),

  brand: Joi.string().hex().length(24).optional().messages({
    "string.base": "Brand should be a string",
    "string.hex": "Brand should be a valid ObjectId",
    "string.length": "Brand should be a valid ObjectId",
  }),

  stock: Joi.number().min(0).required().messages({
    "number.base": "Stock should be a number",
    "number.min": "Stock should be at least 0",
    "any.required": "Stock is required",
  }),

  sale: Joi.object({
    onSale: Joi.boolean().default(false),

    discount: Joi.number()
      .min(0)
      .max(100)
      .default(0)
      .when("onSale", {
        is: true,
        then: Joi.number().min(0).max(100).required(),
        otherwise: Joi.number().optional(),
      })
      .messages({
        "number.base": "Discount should be a number",
        "number.min": "Discount should be between 0 and 100",
        "number.max": "Discount cannot be more than 100",
      }),

    time: Joi.object({
      start: Joi.date().optional(),
      end: Joi.date().optional().greater(Joi.ref("start")).messages({
        "date.greater": "End time must be greater than start time",
      }),
    }).optional(),
  }).optional(),
});

async function productValidator(req, res, next) {
  const { error, value } = productValidationSchema.validate(
    req.body,
    { abortEarly: false }
  );

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        message: err.message,
        path: err.path,
      })),
    });
  }

  req.body = value;

  next();
}

export default productValidator;
