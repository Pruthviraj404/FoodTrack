import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const  signup=async(req,res)=>{
   
    

    try{
        const {email,fullName,password,role}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already Exists"});
        }


        const hashedPassword= await bcrypt.hash(password,10);

        const user=await User.create({
            fullName,
            email,
            password:hashedPassword,
            role
        });

        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge: 24 * 60 * 60 * 1000,
        });


        res.status(200).json({success:true,message:"Signup Sucessfull"});

    }catch(error){
        res.status(500).json({success:false, message: error.message });

    }
};
