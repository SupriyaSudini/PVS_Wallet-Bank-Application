const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
// for encrypting user password we have to use bcryptjs
const bcrypt = require("bcryptjs");
// for generating token
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//register user account
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exits",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // create new user
    const newUser = new User(req.body);
    await newUser.save(); // save user
    res.send({
      message: "User created Successfully",
      data: null, // we should not send the password to fron-end
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// login user account
router.post("/login", async (req, res) => {
  try {
    // check if user exits or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exits",
      });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); // comparing the entered password with the password in user schema
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    // check user is verified or not
    if (!user.isVerified) {
      return res.send({
        success: false,
        message: "User is not verified yet or has been suspended",
      });
    }
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "2d",
    });
    res.send({
      message: "User logged in Successfully",
      data: token,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// get user info
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = " "; // we should not send password to frontend (so send this)
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// get all users
router.get("/get-all-users", authMiddleware, async(req, res) => {
    try{
      const users = await User.find();
      res.send({
        message: "Users fetched Successfully",
        data: users,
        success: true
      })
    }catch(error){
      res.send({
        message: error.message,
        success: false
      });
    }
});

// update verified user status
router.post("/update-user-verified-status", authMiddleware, async(req, res) => {
    try{
      await User.findByIdAndUpdate(req.body.selectedUser,{
        isVerified: req.body.isVerified,
      });
      res.send({
        data: null,
        message: "User Verified status Updated Successfully",
        success: true
      });
    }catch(error){
      res.send({
        data: error,
        message: error.message,
        success: false
      });
    }
  });
module.exports = router;
