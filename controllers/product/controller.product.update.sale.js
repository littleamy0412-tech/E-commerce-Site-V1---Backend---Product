import Product from "../../models/Product.model.js";

async function updateProductSale(req, res) {
  const { id } = req.params;
  const { onSale, discount, start, end } = req.update;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        "sale.onSale": onSale,
        "sale.discount": discount,
        "sale.time.start": start,
        "sale.time.end": end,
      },
    },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    message: "Product sale updated successfully",
    product: updatedProduct,
  });
}

export default updateProductSale;
