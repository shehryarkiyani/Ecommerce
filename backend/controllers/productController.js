const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const productExist = await Product.findOne({ _id: req.params.id });
    if (productExist) {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.json(product);
      res.status(200).json({
        status: true,
        message: "Product deleted successfully",
      });
    }
    res.status(400);
    throw new Error("User not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query; // Default page is 1, and default limit is 10.
  // Parse page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  // Calculate the skip value
  const skip = (pageNumber - 1) * limitNumber;
  // Build the query object
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } }, // Search in name
      { brand: { $regex: search, $options: "i" } }, // Search in brand
    ];
  }
  const products = await Product.find(query)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });
  // Get total count for pagination metadata
  const totalProducts = await Product.countDocuments(query);
  res.status(200).json({
    message: "Product fetch successfully",
    data: products,
    status: true,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
    },
  });
});
module.exports = {
  createProduct,
  updateProductDetails,
  removeProduct,
  getProducts,
};
