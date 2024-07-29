////////////////////////////////route todo
const express = require("express");
const { Todo } = require("../models/todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const todo = await Todo.find().populate("user");
  res.json({ todo });
});

router.post("/", async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const todo = new Todo({ title, description, user });
    await todo.save();
    //   const todo = Todo.create({ title, description, user });
    res.json(todo);
    console.log(todo);
  } catch (err) {
   next(err)
  }
});

module.exports = router;
