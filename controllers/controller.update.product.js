import Product from "../models/Product.model.js";

async function productUpdate(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "No Product Id Specified." });

  const updatedProduct = await Product.findByIdAndUpdate(id, req.update, {
    new: true,
  });

  if (!updatedProduct)
    return res.status(404).json({ message: "Product Not Found." });

  res.status(200).json({ message: "Product Updated.", updatedProduct });
}

export default productUpdate