const mongoose=require("mongoose");
const TodoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  });
  
  const Todo = mongoose.model("Todo", TodoSchema);
//   const newtodo =new Todo({
//     title: "Learn React",
//     description: "Learn React from scratch",
//     completed: false
//   }) 
//   newtodo.save()
  module.exports = {Todo};
  