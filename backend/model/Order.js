import mongoose from "mongoose";



const orderSchema=new mongoose.Schema({
    customerName:{type:String,required:true},
    items:[
        {
            productType:{type:String,required:true},
            quantity:{type:String,required:true}


        }    
    ],
    orderdate:{type:Date,required:true},
    paymentStatus:{type:String,default:"Pending"},
    notes:{type:String}
});

const Order= mongoose.model("Order",orderSchema);
export default Order;