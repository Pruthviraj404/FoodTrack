import express from "express"

import Order from "../model/Order.js"

const router=express.Router();



router.post("/add",async(req,res)=>{
    try{
        const order =new Order(req.body);
        await order.save();
        res.json({success:true,message:"Order saved successfully"});
        


    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Order Not saved"});
    }
});


router.get("/",async(req,res)=>{
    try{
        


        const orders=await Order.find();
        res.json(orders);

    }catch(error){
        res.status(500).json({error:error.message});
    }
});


router.put('/update/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const updateOrder= await Order.findByIdAndUpdate(id,req.body,{new:true});
         
        if(!updateOrder){
            return res.status(404).json({success:false,message:"Order Not Found"});
        }

        res.json({success:true,message:"Order Updated",order:updateOrder

        })


    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error Updating"});
    }

})

export default router;