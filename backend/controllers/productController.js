const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

const createProduct = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
};
