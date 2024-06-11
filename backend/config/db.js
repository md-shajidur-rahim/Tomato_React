import mongoose from "mongoose";

// To handle the connection to the MongoDB database
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sajidrahim47:sajid14710@cluster0.voq8npg.mongodb.net/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); 
    }
};