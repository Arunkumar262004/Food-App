import express from "express";
import { Place_single_order } from "../controllers/Single-order-controller.js";


const Place_buy_order = express.Router();

Place_buy_order.post("/get_single_order",Place_single_order)

    export default Place_buy_order;


