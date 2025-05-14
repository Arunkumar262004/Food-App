import userModel from "../models/User-model.js";
import jwt from "jsonwebtoken";

// Add item to cart
const add_to_cart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in adding to cart" });
    }
};

// remove items from cart
const remove_from_cart = async (req, res) => {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    try {
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Removed from cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in removing from cart" });
    }
};


// fetch user cart data
const get_cart = async (req, res) => {
    try {

        const token = req.headers.token;

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;



        let user_data = await userModel.findById(userId);
        let cart_data = user_data.cartData;

        res.json({ success: true, cart_data })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in fetching cart data" })
    }
}

export { add_to_cart, remove_from_cart, get_cart }