import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      autopopulate: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      autopopulate: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sale: {
      onSale: {
        type: Boolean,
        default: false,
      },
      discount: {
        type: Number,
        min: 0,      
        max: 100,    
        default: 0,  
      },
      time: {
        start: {
          type: Date,
          required: false,
        },
        end: {
          type: Date,
          required: false,
        },
      },
    },
  },
  { timestamps: true }
);

productSchema.plugin(autopopulate);

const Product = mongoose.model("Product", productSchema);

export default Product;
