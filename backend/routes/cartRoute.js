import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware  from "../middleware/auth.js";

// Create a new router instance
const cartRouter = express.Router();

// Define a POST route for adding items to the cart
// Uses authMiddleware to protect the route
// Calls the addToCart controller function
cartRouter.post("/add", authMiddleware, addToCart);

// Define a POST route for adding items to the cart
// Uses authMiddleware to protect the route
// Calls the addToCart controller function
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Define a POST route for adding items to the cart
// Uses authMiddleware to protect the route
// Calls the addToCart controller function
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;