import Product from "../../models/Product.model.js";

async function productUpdateStock(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "No Product Id Specified." });
  }
  const stock = parseInt(req.body.stock);
  if (!stock) {
    return res.status(401).json({ message: "Please enter a valid stock." });
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { stock },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product Not Found." });
  }
  res.status(200).json({ message: "Product Price Updated.", updatedProduct });
}

export default productUpdateStock;
