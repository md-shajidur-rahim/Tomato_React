import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

// Create a new router instance
const userRouter = express.Router();

// Define a POST route for user registration
// Calls the registerUser controller function
userRouter.post("/register", registerUser);

// Define a POST route for user login
// Calls the loginUser controller function
userRouter.post("/login", loginUser);

export default userRouter;