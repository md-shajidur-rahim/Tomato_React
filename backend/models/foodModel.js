import mongoose from "mongoose";

// Define foodSchema for food items
const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true}
})

// Define the model for food items
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// To ensure if a model named "food" already exists, it uses that existing model instead of defining a new one

export default foodModel;