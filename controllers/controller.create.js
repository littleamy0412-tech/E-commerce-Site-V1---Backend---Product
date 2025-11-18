import Model from "../configs/models.js";

function create(modelName) {
  if (!Model[modelName]) {
    throw new Error("Enter a valid Model Name");
  }

  return async function (req, res) {
  const result = await Model[modelName].create(req.body);
  res.status(200).json({
    message: `${modelName.toUpperCase()} Created.`,
    result,
  });
  };
}

export default create;
