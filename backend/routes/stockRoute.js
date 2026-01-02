import express from 'express'
import Stock from '../model/Stock.js'



const router=express.Router();

router.get('/',async(req,res)=>{
    try{
    const stock= await Stock.find().sort({createdAt:-1});
    res.json(stock);
    }catch(error){
        res.status(500).json({error:error.message});
    }

});

router.post('/add',async(req,res)=>{

    try{
        const stock = new Stock(req.body);
        const savedstock= await stock.save();
        res.status(200).json({success:true,message:"Order Save Successfully",data:savedstock});
       

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Stock Not Saved"})
    }
    
});


router.put('/edit/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const updatestock=await Stock.findByIdAndUpdate(id,req.body,{new:true});

        if(!updatestock){
            return res.status(404).json({succes:false,message:"No Stock Found"});

        }
        return res.status(200).json({success:true,message:"Stock Updated Successfully"});

        
       
    
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"error updating"});
    }
});
export default router;