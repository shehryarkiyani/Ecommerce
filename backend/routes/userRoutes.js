const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler.js");
const checkId = require("../middlewares/checkId.js");
const {
  createUser,
  updateUser,
  getUserDetails,
  getUsers,
  deleteUser,
  loginUser,
} = require("../controllers/userController.js");
const router = express.Router();
router.route("/login").post(loginUser);
router.route("/").get(validateToken, getUsers).post(createUser);
router
  .route("/:id")
  .get(validateToken, checkId, getUserDetails)
  .put(validateToken, checkId, updateUser)
  .delete(validateToken, checkId, deleteUser);
module.exports = router;
