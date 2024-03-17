import User from "../models/userModel.js";
import AsyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    let user = Existinguser[0]
    
   return res.status(201).json({ id:user._id,email:user.email,username:user.username,isAdmin:user.isAdmin });
  });
  const Signout = AsyncHandler(async(req,res)=>{
    res.cookie('jwt',"",{
      httpOnly:true,
      expires:new Date(0)
    })
    return res.status(200).json({message:"User Logout successfully"})
  })
  export { Signin,Signout };