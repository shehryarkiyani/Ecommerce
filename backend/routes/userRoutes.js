import express from "express";
import { createUser,getUser,Signin } from "../controllers/userController.js";
const router = express.Router()
router.post('/',createUser)
router.post('/login',Signin)
router.get('/', getUser);
export default router
