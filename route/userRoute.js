const express = require("express");

const { userModal } = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;

  try {
    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res
        .status(409)
        .json({ msg: "Email is already exist,try to Log in!" });
    }
    const existinguserName = await user.findOne({ name });
    if (existinguserName) {
      return res
        .status(409)
        .json({ msg: "name is already exist,try to Log in!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      return res.json({ msg: "some thing went wrong" });
    } else {
      const user = new userModal({
        ...req.body,
        password: hash,
      });
      await user.save();
      return res
        .status(200)
        .json({ msg: "New user is Added Sucessfull!", user: user });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.secreatkey,
            { expiresIn: "7d" }
          );
          const reftoken = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.secreatkey,
            { expiresIn: "10d" }
          );
          res.status(200).json({
            mag: "New user added sucessfully ",
            token: token,
            reftoken: reftoken,
          });
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
        // result == true
      });
    } else {
      res.status(200).json({ error: "Invalid password" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

module.exports = {
  userRouter,
};
