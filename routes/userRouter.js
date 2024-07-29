const express = require("express");
const { User } = require("../models/user");
const {authentication} =require("../middleware/authanticate")

const router = express.Router();

// let todos = [];
// let nextId = 1;

router.get("/", async (req, res) => {
  const user = await User.find();
  res.json({user});
});

router.post("/", authentication,async (req,res,next) => {
  try{
  const { name ,email,password } = req.body;
  const user = new User({ name,email,password});
  await user.save();
  res.json(user);
  console.log(user)}
  catch(err){
    res.json({message:err.message});
    }
    // next(err);}
});
module.exports = router;

