import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js"
import user_router from "./routes/User-route.js";
import  "dotenv/config"
import cart_router from "./routes/cart-Route.js";
import orderRouter from "./routes/Order-route.js";
import place_buy_order from "./routes/single_order_router.js";
// appp config
const app = express();
const port = 4000

// middlewears
app.use(express.json())
app.use(cors())
app.use(express.json()); 

// db connection 
connectdb();

// api enddpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",user_router); 

app.use("/api/cart",cart_router);
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
    res.send("API Working")
})
app.use("/api/placesingle",place_buy_order)


// mongodb://localhost:27017


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
    
})
