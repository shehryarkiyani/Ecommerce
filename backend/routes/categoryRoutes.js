import express from "express";
import { CreateCategory,getAllCategories,updateCategory } from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router()


router.route('/').post(authenticate,CreateCategory).get(authenticate,getAllCategories)
router.route('/:id').put(authenticate,updateCategory)
export default router