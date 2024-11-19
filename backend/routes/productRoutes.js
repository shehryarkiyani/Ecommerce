const express = require("express");
const {
  createProduct,
  updateProductDetails,
  getProducts,
  removeProduct,
  addProductReview,
} = require("../controllers/productController.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
const validId = require("../middlewares/checkId.js");
const formidable = require("express-formidable");
const router = express.Router();
router
  .route("/")
  .get(validateToken, getProducts)
  .post(validateToken, formidable(), createProduct);
router
  .route("/:id")
  .patch(validateToken, updateProductDetails)
  .delete(validateToken, removeProduct);
router
  .route("/product-review/:id")
  .post(validateToken, validId, addProductReview);
module.exports = router;
