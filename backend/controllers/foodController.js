import foodModel from "../models/foodModel.js";
// To handle file operations
import fs from "fs";

// listFood function to fetch and list all food items from the database
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in listing food" });
  }
};

// addFood function to add a new food item to the database
const addFood = async (req, res) => {

  // image_filename function to retrieve the filename of the uploaded image
  let image_filename = `${req.file.filename}`;

  // Creating a new instance of foodModel with the details 
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  // Saves the new food item to the database
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding food" });
  }
};

// removeFood function to remove a food item from the database and delete its associated image file
const removeFood = async (req, res) => {
  try {
    // Find the food item by its ID
    const food = await foodModel.findById(req.body.id);
    // fs.unlink function to delete the image file associated with the food item
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while removing food" });
  }
};

export { addFood, listFood, removeFood };