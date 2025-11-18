import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name cannot be empty.',
    }),

  description: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Description must be a string.',
      'string.empty': 'Description cannot be empty.',
    }),

  price: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Price must be a number.',
      'number.min': 'Price must be at least 0.',
    }),

  category: Joi.string()
    .optional()
    .messages({
      'string.base': 'Category must be a valid ObjectId (string).',
    }),

  brand: Joi.string()
    .optional()
    .messages({
      'string.base': 'Brand must be a valid ObjectId (string).',
    }),

  stock: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Stock must be a number.',
      'number.min': 'Stock must be at least 0.',
    }),
}).messages({
  'object.base': 'Product data must be an object.',
});

async function productUpdateValidator(req, res, next) {
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

  req.update = value;

  next();
}

export default productUpdateValidator;
