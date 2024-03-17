import express from "express";
import { Signin,Signout } from "../controllers/authController.js";
import { authAdmin,authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/login',Signin)
router.post('/logout', Signout);
export default router