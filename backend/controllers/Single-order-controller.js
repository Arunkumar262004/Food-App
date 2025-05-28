import OrderModel from "../models/Order-model.js";
import userModel from "../models/User-model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order from frontend 
const Place_single_order = async (req, res) => {

    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new OrderModel({
            userId:req.headers.token,
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
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivry Charges"
                },
                unit_amount: Math.round(2 * 100),
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
        res.json({ success: false, message: "Error" })

    }
}




export { Place_single_order } 