import bcrypt from 'bcrypt';
import { Type }  from 'lucide-react';
import mongoose from 'mongoose';


const userSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["viewer", "editor", "admin"]},


}

);



export default mongoose.model("User",userSchema);