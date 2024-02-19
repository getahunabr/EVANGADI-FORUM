const express = require("express");
const router = express.Router();

//authtication middleware
const authMiddleware = require("../middleWare/authMiddleware");

//user controller
const { register, login, CheckUser } = require("../controller/UserController");
//register routes
app.post("/register", register);
//login user
app.post("/login", login);
//check user
app.get("/check", authMiddleware, CheckUser);

module.exports = router;
