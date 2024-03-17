import Category from "../models/categoryModel.js";
import AsyncHandler from "../middlewares/asyncHandler.js";

const CreateCategory=AsyncHandler(async(req,res)=>{
    const {name} = req.body
    if(name?.length===0) return res.status(401).json({message:"Category name required"})
    const ExistingCategory = await Category.findOne({name})

    if(!ExistingCategory){
       let categoryResponse= await new Category(req.body).save()
        return res.status(200).json({data:categoryResponse})
    }
    return res.status(200).json({message:"Category already exist"})
    
})
const getAllCategories=AsyncHandler(async(req,res)=>{
    let categoryResponse = await Category.find()
    return res.status(200).json({data:categoryResponse})
})
const updateCategory=AsyncHandler(async(req,res)=>{
    let {id}= req.params
    const{name}=req.body
    let category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        // Check if a category with the given name already exists
        const existingCategory = await Category.findOne({ name });
        console.log(existingCategory,"existingCategory")
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).json({ message: "Category with this name already exists" });
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.status(200).json({ data: updatedCategory })
})
const deleteCategory = AsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    
    if (category) {
      await category.deleteOne({ _id: category._id });
      return res.status(201).json({ message: "category deleted successfully" });
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  });
export {CreateCategory,getAllCategories,updateCategory,deleteCategory}