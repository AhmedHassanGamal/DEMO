///////////////Task2///////

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 8000;
// const server = http.createServer();

// server.on("request", (req, res) => {
//   switch (req.url) {
//     case "/":
//       fs.readFile("./public/index.html", { encoding: "utf-8" }, (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/html" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(200, { "Content-Type": "text/html" });
//           res.end(file);
//         }
//       });
//       break;

//     case "/style.css":
//       fs.readFile("./public/style.css", { encoding: "utf-8" }, (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/css" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(200, { "Content-Type": "text/css" });
//           res.end(file);
//         }
//       });
//       break;

//     case "/perceptual-standard.jpg":
//       fs.readFile("./public/perceptual-standard.jpg", (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "image/jpg" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(200, { "Content-Type": "image/jpg" });
//           res.end(file);
//         }
//       });
//       break;

//     case "/a.mp4":
//       fs.readFile("./public/a.mp4", (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "video/mp4" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(200, { "Content-Type": "video/mp4" });
//           res.end(file);
//         }
//       });
//       break;

//     case "/favicon.ico":
//       fs.readFile("./public/favicon.ico", (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "image/x-icon" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(200, { "Content-Type": "image/x-icon" });
//           res.end(file);
//         }
//       });
//       break;

//     default:
//       fs.readFile("./public/404.html", { encoding: "utf-8" }, (err, file) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/html" });
//           res.end("Server Error");
//         } else {
//           res.writeHead(404, { "Content-Type": "text/html" });
//           res.end(file);
//         }
//       });
//       break;
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

////////////////task 1///////////

// const http = require("http");
// const { v4: uuidv4 } = require("uuid");

// let todos = [];
// let nextId = 1;

// const server = http.createServer();

// server.on("request", async (req, res) => {
//   console.log(req.method, req.url);

//   if (req.url === "/todos") {
//     switch (req.method) {
//       case "GET":
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(todos));
//         break;

//         default:
//             res.writeHead(404);
//             res.end("Not Found");

//       case "POST":
//         let postData = await getRequestBody(req);
//         let newTodo = { id: nextId++, text: postData.text };
//         todos.push(newTodo);
//         res.writeHead(201, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(newTodo));
//         break;

//       case "PUT":
//         let putData = await getRequestBody(req);
//         let todoToUpdate = todos.find((todo) => todo.id === putData.id);
//         if (todoToUpdate) {
//           todoToUpdate.text = putData.text;
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(JSON.stringify(todoToUpdate));
//         } else {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "ToDo item not found" }));
//         }
//         break;

//       case "DELETE":
//         let deleteData = await getRequestBody(req);
//         let index = todos.findIndex((todo) => todo.id === deleteData.id);
//         if (index !== -1) {
//           todos.splice(index, 1);
//           res.writeHead(204);
//           res.end();
//         } else {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "item not found" }));
//         }
//         break;

//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Route not found" }));
//   }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// async function getRequestBody(req) {
//     return new Promise((resolve, reject) => {
//       let body = "";
//       req.on("data", (chunk) => {
//         body += chunk.toString();
//       });
//       req.on("end", () => {
//         try {
//           if (body) {
//             resolve(JSON.parse(body));
//           } else {
//             resolve({});
//           }
//         } catch (err) {
//           reject(err);
//         }
//       });
//       req.on("error", (err) => {
//         reject(err);
//       });
//     });
//   }

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

////////////////////////////////////////////CRUD BY EXPRESS////////////////////////////////////////////////////
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const UserRoutes = require("./routes/userRouter.js");
const TodoRoutes = require("./routes/todoRouter.js");
const authRoutes = require("./routes/authRouter.js");
const app = express();
const { connectDB } = require("./db.js");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
app.use(morgan("dev"));
app.use(express.json());
connectDB();
app.use(cors());
app.use("/users", UserRoutes);
app.use("/todos", TodoRoutes);
app.use("/auths", authRoutes);

// app.use("*", (req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });
////////using multer////////
const multer = require("multer");
const { sendMail } = require("./email.js");
// const storage = ;

const fileFilterFunction = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .png"), false);
  }
};

const upload = multer({
  limits: { files: 7 },
  // storage:multer.memoryStorage()
  storage: multer.diskStorage({
    destination: "./postmanFiles",
    filename: (req, file, func) => {
      func(null, file.originalname);
    },
  }),
});

// single('field name')
app.use("/task", upload.single("img1"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filepath = path.join(__dirname, req.file.path);
  console.log(filepath);
  sendMail(req.file.originalname, req.file.originalname, filepath);
  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";
  res.status(statusCode).json({ message: message });
});

module.exports = app;

///////////////////////////////////////Static Request///////////////////////////////

// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const morgan = require("morgan");
// const app = express();
// const PORT = 8000;
// app.use(morgan("dev"));
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// app.get("/style.css", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "public", "style.css"));
//   next();
// });
// app.get("/perceptual-standard.jpg", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "public", "perceptual-standard.jpg"));
//   next();
// });

// app.get("/a.mp4", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "public", "a.mp4"));
//   next();
// });
// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "404.html"));
//   next();
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

////////////////////////////////////////////////////Express .STATIC//////////////////////////////////
// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const morgan = require("morgan");
// const app = express();
// const PORT = 8000;
// app.use(morgan("dev"));
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// app.use(express.static("./public"));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// })
