const mongoose = require("mongoose");
// const Clientshema = new mongoose.shema({
//   name: String,
//   email: String,
//   password: String,
//   phone: Number,
// });
// const Client = mongoose.model("client", Clientshema);
// Client.inserMany({
//   name: "ahmed",
//   email: "asaaa",
//   password: "1234",
//   phone: "33333",
// })
//   .then((resultt) => {
//     console.log(resultt);
//   })
//   .catch((err) => {
//     console.log("Error in database shema", err);
//   });

const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then((conn)=>{console.log(`connected to the database :${conn.connection.host}`);
    })
};
// connectDB();
module.exports={connectDB};
