import 'dotenv/config';
//dotenv.config();

// Importing the Stripe library for payment processing
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Create a new instance of Stripe using the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // newOrder function to create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // To save a new order in the database
    await newOrder.save();
    // To clear the user's cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // line_items function to prepare the line items for the Stripe checkout session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "bdt",
        product_data: {
          name: "Delivery Changes",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // To create a Stripe checkout session with line items from the order
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while placing the order" });
  }
};

// verifyOrder function to verify payment success and update the order status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  //  Updates the order as paid if successful or deletes it if payment failed
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while verifying the order" });
  }
};

// userOrders function to fetch all orders for a specific user (frontend)
const userOrders = async (req, res) => {
  try {
    // To retrieve orders from the database based on userId
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in fetching all orders for the user" });
  }
};

// listOrders function to fetch all orders for the admin panel
const listOrders = async (req, res) => {
  try {
    // To retrieve all orders from the database
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while fetching all orders for admin" });
  }
};

// API for updating the status of an order
const updateStatus = async (req, res) => {
  try {
    // To find the order by ID and update its status
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };