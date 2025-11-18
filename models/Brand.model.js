import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Brand name is required."],
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
