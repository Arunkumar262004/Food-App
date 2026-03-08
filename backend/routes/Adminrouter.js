import express from "express";
import { adminLogin, seedAdmin } from "../controllers/Admincontroller.js";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/seed", seedAdmin); // Visit once to create admin, then remove or protect

export default adminRouter;