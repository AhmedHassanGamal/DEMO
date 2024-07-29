const express = require("express");
const { User } = require("../models/user");
const { authentication } = require("../middleware/authanticate");
const { body,header,query, params, validationResult } = require("express-validator");

const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//USER SIGN UP

router.post(
  "/signup",
  [
    body("name")
      .exists()
      .withMessage("Please name is required")
      .notEmpty("Check ur name is empty"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    try {
      const { name, email, password } = req.body;
      //hash password
      const hashedPassword = await bcryptjs.hash(password, 10);
      console.log(hashedPassword);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
      res.status(200).json({ token });
    } catch (err) {
      // res.json({message:err.message});
      // }
      next(err);
    }
  }
);

//LOGIN USER
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Invalid password" });
    }
    //JWT TOKEN
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ token });
  } catch (err) {
    // res.json({message:err.message});
    // }
    next(err);
  }
});

//GET ALL USERS
router.get("/", authentication, async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({ user });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
