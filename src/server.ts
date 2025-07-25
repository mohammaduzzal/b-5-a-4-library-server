import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import route from "./modules/routes";



const app = express();

app.use(cors({
  origin : ["http://localhost:5173","https://assignment-4-client-one.vercel.app"],
  credentials:true
}));

app.use(express.json());
app.use(route)

app.get("/", (req,res)=>{
    res.send({
        success :true,
        message : "hey it is library management server"
    })
});

app.listen(config.port, ()=>{
    console.log(`✔ express server is running on server ${config.port}`);
})

// connect to mongodb
async function server() {
    try {
        await mongoose.connect(config.database_url as string)
        console.log(`🍃 MongoDB connected successfully`);

        
    } catch (error) {
         console.error(`❌ MongoDB connection error:`, error);
    }
}

server()