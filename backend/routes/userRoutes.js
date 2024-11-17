const express = require("express");
const validateToken = require("../middlewares/validateTokenHandler.js");
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
  .get(validateToken, getUserDetails)
  .put(validateToken, updateUser)
  .delete(validateToken, deleteUser);
module.exports = router;
