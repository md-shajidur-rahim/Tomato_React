import mongoose from "mongoose";

// Define orderSchema for orders
const orderSchema = new mongoose.Schema({
    userId: { type:String, required:true },
    items: { type:Array, required:true },
    amount: { type:Number, required:true },
    address: { type:Object, required:true },
    status: { type:String, default:"Food Processing" },
    date: { type:Date, default:Date.now() },
    payment: { type:Boolean, default:false } 
})

// Define the model for orders
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;