import express from "express";
import authMiddleware from "../middleware/auth.js";
import { 
    placeOrder, 
    verifyOrder, 
    userOrders, 
    listOrders, 
    updateStatus } from "../controllers/orderController.js";

// Create a new router instance
const orderRouter = express.Router();

// Define a POST route for placing an order
// Protected by the authMiddleware to ensure only authenticated users can place an order
orderRouter.post("/place", authMiddleware, placeOrder);

// Define a POST route for verifying an order
orderRouter.post("/verify", verifyOrder);

// Define a POST route for fetching user orders
// Protected by the authMiddleware to ensure only authenticated users can view their orders
orderRouter.post("/userOrders", authMiddleware, userOrders);

// Define a GET route for listing all orders
orderRouter.get("/list", listOrders);

// Define a POST route for updating the status of an order
orderRouter.post("/status", updateStatus);

export default orderRouter;