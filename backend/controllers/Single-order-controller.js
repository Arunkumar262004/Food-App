import Stripe from "stripe";
import OrderModel from "../models/Order-model.js";
import userModel from "../models/User-model.js";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173";

const Place_single_order = async (req, res) => {
  try {
    // ✅ Support both "token" header AND "Authorization: Bearer <token>"
    // dummy account london 4000008260000000
    const rawToken =
      req.headers.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!rawToken) {
      return res.json({ success: false, message: "No token provided" });
    }

    let userId;
    try {
      const decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
      // Handle both { id } and { _id } shapes
      userId = decoded.id || decoded._id;
    } catch (jwtErr) {
      return res.json({ success: false, message: "Invalid or expired token", error: jwtErr.message });
    }

    if (!userId) {
      return res.json({ success: false, message: "User ID not found in token" });
    }

    const { address, items, amount } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    // ✅ Save order to DB
    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // ✅ Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Build Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // paise
      },
      quantity: item.quantity,
    }));

    // ✅ Delivery fee — ₹20 = 2000 paise
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2000,
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
    // ✅ Log the REAL error so you can debug it
    console.error("Stripe order error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { Place_single_order };