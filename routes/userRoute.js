const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mail = require("../utils/mail");
const helper = require("../utils/helper");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    newUser.save();
    res.send("User Registered successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User Login Failed " });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({}).select("+password");
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;

  try {
    await User.findOneAndDelete({ _id: userid });
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// forgot password send reset link

router.post("/forgot/password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const token = helper.generateToken();

  user.token = token;
  user.tokenCreatedAt = Date.now();
  await user.save();

  await mail.forgotPasswordMail({
    emailTo: email,
    token,
    reason: "Forgot Password",
  });

  res.send("Reset link sent to your email");
});

// reset password

router.post("/reset/password", async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  // check if tokenExpires field is greater than current date by 10 minutes

  const tenMinutes = 600000;
  const timeDifference = Date.now() - user.tokenCreatedAt;

  console.log(timeDifference);

  if (timeDifference > tenMinutes) {
    return res.status(400).json({ message: "Token expired" });
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  console.log(newPassword);
  user.password = newPassword;
  await user.save();
  res.send("Password reset successfully");
});

module.exports = router;
