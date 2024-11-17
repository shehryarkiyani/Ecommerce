const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    image: { type: String, required: [true, "Image is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: [true, "Description is required"] },
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: [true, "Price is required"], default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
