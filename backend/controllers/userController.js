const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const checkUserExist = await User.findOne({ email });
  if (!checkUserExist) {
    res.status(400);
    throw new Error("User not exist");
  }
  const passwordMatch = await bcrypt.compare(
    password,
    checkUserExist?.password
  );
  if (!passwordMatch) {
    res.status(400);
    throw new Error("Password not match");
  }
  const accessToken = await jwt.sign(
    {
      user: {
        username: checkUserExist.username,
        email: checkUserExist.email,
        id: checkUserExist?._id,
        isAdmin: checkUserExist?.isAdmin,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  res
    .status(200)
    .json({ message: "User login successfully", status: true, accessToken });
});
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const checkUserExist = await User.findOne({ email });
  if (checkUserExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    isAdmin: isAdmin || false,
  });
  res.status(200).json({
    message: "User created successfully",
    data: {
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin || false,
    },
    status: true,
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    if (req.body.password) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashPassword;
    }
    const updated_user = await user.save();
    res.status(200).json({
      data: updated_user,
      status: true,
      message: "User updated successfully",
    });
  }
  res.status(400);
  throw new Error("User not found");
});
const deleteUser = asyncHandler(async (req, res) => {
  const userExist = await User.findOne({ _id: req.params.id });
  if (userExist) {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  }
  res.status(400);
  throw new Error("User not found");
});
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query; // Default page is 1, and default limit is 10.
  // Parse page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  // Calculate the skip value
  const skip = (pageNumber - 1) * limitNumber;
  // Build the query object
  const query = {};
  if (search) {
    query.username = { $regex: search, $options: "i" };
  }
  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });
  // Get total count for pagination metadata
  const totalUsers = await User.countDocuments(query);
  res.status(200).json({
    message: "User fetch successfully",
    data: users,
    status: true,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      total: totalUsers,
      totalPages: Math.ceil(totalUsers / limitNumber),
    },
  });
});
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (user) {
    res.status(200).json({
      data: user,
      message: "User fetch successfully",
      status: true,
    });
  }
  res.status(404);
  throw new Error("User not found");
});
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserDetails,
  loginUser,
};
