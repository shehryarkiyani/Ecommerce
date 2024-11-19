const express = require("express");
const { createProduct } = require("../controllers/productController.js");
const validateToken = require("../middlewares/validateTokenHandler.js");
const formidable = require("express-formidable");
const router = express.Router();
router.route("/").post(validateToken, formidable(), createProduct);
module.exports = router;
