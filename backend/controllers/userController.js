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
  res.status(201).json(users);
});
const Signin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Existinguser = await User.find({ email });

  if (Existinguser.length === 0)
    res.status(401).send({ message: "User not exist" });
  const isPasswordValid = await bcrypt.compare(
    password,
    Existinguser[0].password
  );
  if (!isPasswordValid) res.status(401).send({ message: "Wrong Password" });
  const token = jwt.sign(
    { userId: Existinguser[0]._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ user: Existinguser[0] });
});
export { createUser, getUser, Signin };
