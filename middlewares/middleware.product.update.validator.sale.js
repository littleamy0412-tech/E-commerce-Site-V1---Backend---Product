import Joi from "joi";

const updateProductSaleSchema = Joi.object({
  onSale: Joi.boolean().optional(),
  discount: Joi.number().min(0).max(100).optional(),
  start: Joi.date().iso().optional(),
  end: Joi.date().iso().optional(),
});

async function updateProductSaleValidator(req, res, next) {
  const { error, value } = updateProductSaleSchema.validate(req.body, {
    abortEarly: false,
  });

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

export default updateProductSaleValidator;
