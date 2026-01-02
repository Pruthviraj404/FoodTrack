
import mongoose from "mongoose";


const StockSchema=new mongoose.Schema({
       
      productName:{type:String,required:true},
      sku:{type:String,required:true},
      category:{type:String,required:true},
      unit:{ type:String,required:true},
      status:{type:String,required:true},
      quantity:{type:String,required:true},
      lastUpdated: {type:String,required:true},
      price:{type:String,required:true}


});


const Stock=mongoose.model('Stock',StockSchema);
export default Stock;

