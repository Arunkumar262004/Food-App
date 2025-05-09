import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js"
import user_router from "./routes/User-route.js";
import  "dotenv/config"
// appp config
const app = express();
const port = 4000

// middlewears
app.use(express.json())
app.use(cors())

// db connection 
connectdb();

// api enddpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",user_router); 



app.get("/",(req,res)=>{
    res.send("API Working")
})



// mongodb://localhost:27017


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
    
})
