import express from "express";
import { loginuser,registeruser } from "../controllers/User-controller.js";


const user_router = express.Router();

user_router.post("/login",loginuser);
user_router.post("/register",registeruser);

export default user_router;