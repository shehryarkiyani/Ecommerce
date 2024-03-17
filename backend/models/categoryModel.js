import mongoose from "mongoose";

const CategorySchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        required:true
    }
})
const Category =mongoose.model('Category',CategorySchema)
export default Category