import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import stockRoute from './routes/stockRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config()


app.use(cors({
   origin:"http://localhost:3000",
   credentials:true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use("/api/orders",orderRoutes)
app.use("/api/stocks",stockRoute)
app.use("/api/auth",AuthRoute)


app.listen(5000,()=>console.log("Server Started"));




 app.get('/',(req,res)=>{
    res.send("Food track api running");
    });
    
    
console.log("JWT_SECRET =", process.env.JWT_SECRET);




