import mongoose from "mongoose";

 const ConnectDB=async()=>{
    
    try{
        
     await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected")
    }catch(err){
        console.log('error',err)
        process.exit(1)
    }
}
export default ConnectDB