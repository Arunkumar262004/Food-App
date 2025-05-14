import express from 'express';
import authMiddlewear from '../middlewear/auth.js';
import { PlaceOrder, usersOrder, verifyOrder,listOrders ,UpdateStatus} from '../controllers/Order-controller.js';


const orderRouter = express.Router();


orderRouter.post("/place",authMiddlewear,PlaceOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddlewear,usersOrder);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",UpdateStatus);




export default orderRouter;