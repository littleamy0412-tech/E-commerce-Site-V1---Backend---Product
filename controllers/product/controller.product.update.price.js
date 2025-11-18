import Product from "../../models/Product.model.js";

async function productUpdatePrice(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "No Product Id Specified." });
  const price = parseFloat(req.body.price);
  if (!price)
    return res.status(401).json({ message: "Please Enter a valid price." });
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { price },
    { new: true }
  );
  if (!updatedProduct)
    return res.status(404).json({ message: "Product Not Found." });
  res.status(200).json({ message: "Product Price Updated.", updatedProduct });
}

export default productUpdatePrice;
