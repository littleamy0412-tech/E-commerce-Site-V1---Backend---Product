import Model from "../configs/models.js";

function Delete(modelName) {
  if (!Model[modelName]) throw new Error("Enter a valid Model Name");

  return async function (req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: `No Id Specified.`,
      });
    }

    const result = await Model[modelName].findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `${modelName.toUpperCase()} Not Found.`,
      });
    }

    res.status(200).json({
      message: `${modelName.toUpperCase()} deleted.`,
      result,
    });
  };
}

export default Delete;
