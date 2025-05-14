import OrderModel from "../models/Order-model.js";
import userModel from "../models/User-model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order from frontend 
const PlaceOrder = async (req, res) => {

    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivry Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })



        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })


        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})

    }
}

const verifyOrder = async (req,res) =>{

    const {orderId,success} = req.body;
    try {
         if(success === "true"){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
         }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
         }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Reoving this Id after Payment"})
        
    }
}


// user order for fontend
const usersOrder = async (req,res)=>{

    try {
        const orders = await OrderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in order"})
        
    }
}


// list of user orders in admin pannel

const listOrders = async (req,res) =>{
    try {
        const Orders = await OrderModel.find({});
        res.json({success:true,data:Orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error List order"})
        
    }
}


// API For Updating order Status

const UpdateStatus = async (req,res)=>{
try {
    await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Staus Updated"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error inSaving the Status"})
    
}
}

export { PlaceOrder,verifyOrder,usersOrder,listOrders,UpdateStatus } 