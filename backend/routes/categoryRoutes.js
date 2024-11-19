const express = require("express");
const checkId = require("../middlewares/checkId.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
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
  .put(validateToken, checkId, updateCategory)
  .delete(validateToken, checkId, deleteCategory)
  .get(validateToken, checkId, getCategoryDetails);
module.exports = router;
