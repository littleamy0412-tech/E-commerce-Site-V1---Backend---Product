import Model from "../configs/models.js";

function getAll(modelName) {
  if (!Model[modelName]) throw new Error("Enter a valid Model Name");

  return async function (req, res) {
    const result = await Model[modelName].find();

    res.status(200).json({
      message: `${modelName.toUpperCase()} fetched.`,
      total_Num: result.length,
      result,
    });
  };
}

export default getAll;
