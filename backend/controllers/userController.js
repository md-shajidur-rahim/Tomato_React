import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// loginUser function to handle user login by verifying email & password, then generating a JWT
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // To retrieve the user by email from the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // To compare the provided password with the stored hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials in password" });
    }

    // To generate a JWT using the createToken function and returns it
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while user login" });
  }
};

// createToken function to generate a JWT for the given user ID
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// registerUser function to handle user registration by creating a new user after validation & password hashing
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Checks if a user with the given email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // To validate the email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // To check if the password is strong enough
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // To hash the user password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // To Create a new user with the provided details and the hashed password
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // To save the new user to the database and generate a JWT
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while user register" });
  }
};

export { loginUser, registerUser };