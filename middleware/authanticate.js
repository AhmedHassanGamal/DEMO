const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { token } = require("morgan");
const authentication = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res.status(401).send("Access denied, No token provided.");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { authentication };
