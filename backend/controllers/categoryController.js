const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel.js");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryExist = await Category.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  });
  if (categoryExist) {
    res.status(400);
    throw new Error("Category already exist");
  }
  const newCategory = await Category.create({
    name,
  });
  res.status(200).json({
    category: newCategory,
    status: true,
    message: "Category created successfully",
  });
});
const getCategoryDetails = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  if (category) {
    res.status(200).json({
      data: category,
      message: "Category fetch successfully",
      status: true,
    });
  }
  res.status(404);
  throw new Error("Category not found");
});
const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query; // Default page is 1, and default limit is 10.
  // Parse page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  // Calculate the skip value
  const skip = (pageNumber - 1) * limitNumber;
  // Build the query object
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  const categories = await Category.find(query)
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });
  // Get total count for pagination metadata
  const totalCategories = await Category.countDocuments(query);
  res.status(200).json({
    message: "Category fetch successfully",
    data: categories,
    status: true,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      total: totalCategories,
      totalPages: Math.ceil(totalCategories / limitNumber),
    },
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const categoryExist = await Category.findOne({ _id: req.params.id });
  if (categoryExist) {
    const updated_category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      category: updated_category,
      status: true,
      message: "Category updated successfully",
    });
  }
  res.status(400);
  throw new Error("Category not found");
});
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryExist = await Category.findOne({ _id: req.params.id });
  if (categoryExist) {
    await Category.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      category: categoryExist,
      status: true,
      message: "Category deleted successfully",
    });
  }
  res.status(400);
  throw new Error("Category not found");
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
};
