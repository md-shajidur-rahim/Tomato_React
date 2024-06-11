import userModel from "../models/userModel.js";

// addToCart function to add items to the user cart
const addToCart = async (req, res) => {
  try {
    // findOne => findById
    // findById function fetches the user data from the database
    let userData = await userModel.findOne({_id:req.body.userId});
    // To extract the user's cart data
    let cartData = await userData.cartData;

    // Update cart data
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // To update the user's cart data in the database with the modified cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while adding to cart" });
  }
};

// removeFromCart function to remove items from the user cart
const removeFromCart = async (req, res) => {
  try {
    // findById function to fetch the user data
    let userData = await userModel.findById(req.body.userId);
    // To extract the cart data
    let cartData = await userData.cartData;

    // Update cart data
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    // findByIdAndUpdate function to update the user's cart data in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while removing from cart" });
  }
};

// getCart function to get items from the user cart
const getCart = async (req, res) => {
  try {
    //  findById function fetches the user data
    let userData = await userModel.findById(req.body.userId);
    // To extract the cart data
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while getting the cart" });
  }
};

export { addToCart, removeFromCart, getCart };