import mongoose from "mongoose";


const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/ShevyaManagement");
        console.log("Database connected");


    }catch(error){
         console.error("Database Error:", error.message); // <-- use console.error for visibility
         process.exit(1);
    }
};




export default connectDB;