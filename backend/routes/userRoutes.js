import express from "express";
import { createUser,getUser,updateUser,deleteUser} from "../controllers/userController.js";
import { authAdmin,authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router()
router.post('/',createUser)

router.get('/',authenticate ,getUser);
router.put('/:id',authenticate,updateUser)
router.delete('/:id',authenticate,deleteUser)
export default router
