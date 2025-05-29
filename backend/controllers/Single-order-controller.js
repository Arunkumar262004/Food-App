import Stripe from "stripe";
import OrderModel from "../models/Order-model.js";
import userModel from "../models/User-model.js";
import jwt from "jsonwebtoken"; // Only needed if using JWT

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173";

const Place_single_order = async (req, res) => {
  try {
    // ✅ Extract user ID (from token, or req.body)
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // OR use req.body.userId
    const userId = decoded.id;

    const { address, items, amount } = req.body;

    // ✅ Save order to DB
    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address
    });
    await newOrder.save();

    // ✅ Clear cart (optional)
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Prepare line_items for Stripe (1 item + delivery fee)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // ✅ Add delivery fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // ₹2
      },
      quantity: 1,
    });

    // ✅ Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe order error:", error);
    res.json({ success: false, message: "Order failed" });
  }
};

export { Place_single_order };
