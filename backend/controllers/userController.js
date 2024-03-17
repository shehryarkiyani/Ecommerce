import User from "../models/userModel.js";
import AsyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const createUser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please Fill All inputs");
  }
  const userExist = await User.findOne({ email });
  if (userExist) res.status(400).send({ message: "User Already Exist" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();

    const { password, ...data } = newUser.toObject();
    res.status(201).json({ user: data });
  } catch (err) {
    res.status(400);
    throw new Error("Invalid Data");
  }
});
const getUser = AsyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  return res.status(201).json({ data: users });
});
const updateUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashPassword;
    }
    Object.keys(updates).forEach((key) => {
      if (key !== "password") {
        user[key] = updates[key];
      }
    });
    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
  res.status(201).json({ userId: id });
});
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    await user.deleteOne({ _id: user._id });
    return res.status(201).json({ message: "User deleted successfully" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});
export { createUser, getUser, updateUser, deleteUser };
