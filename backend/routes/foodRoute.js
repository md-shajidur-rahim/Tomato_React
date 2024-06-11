import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

// Create a new router instance
const foodRouter = express.Router();

// Image Storage Engine configuration for Multer
const storage = multer.diskStorage({
    // Specify the destination folder for uploaded files
    destination:"uploads",
    // Create a unique filename by appending the current timestamp to the original file name
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
}) 

// Create a Multer instance with the specified storage configuration
const upload = multer({ storage: storage });

// Define a POST route for adding a new food item
// Uses the upload.single("image") middleware to handle single file uploads
// Calls the addFood controller function
foodRouter.post("/add", upload.single("image"), addFood);

// Define a GET route for listing all food items
// Calls the listFood controller function
foodRouter.get("/list", listFood);

// Define a POST route for removing a food item
// Calls the removeFood controller function
foodRouter.post("/remove", removeFood);

export default foodRouter;