import express from "express";
import { add_to_cart, get_cart, remove_from_cart } from "../controllers/Cart-controller.js";
import authMiddlewear from "../middlewear/auth.js";

const cart_router = express.Router();

cart_router.post("/add",authMiddlewear,add_to_cart)
cart_router.post("/remove",authMiddlewear,remove_from_cart)
cart_router.post("/get",authMiddlewear,get_cart)

    export default cart_router;


