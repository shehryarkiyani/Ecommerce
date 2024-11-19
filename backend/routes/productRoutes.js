const express = require("express");
const {
  createProduct,
  updateProductDetails,
  getProducts,
  removeProduct,
} = require("../controllers/productController.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
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
module.exports = router;
