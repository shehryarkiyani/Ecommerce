const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController.js");
const router = express.Router();
router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategoryDetails);
module.exports = router;
