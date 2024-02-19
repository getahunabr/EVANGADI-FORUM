const express = require("express");
const app = express();
const PORT = 6000;
require("dotenv").config();

//db connection
const dbConnection = require("./db/dbConfig");

//json middleware to extracts json data

app.use(express.json());

//user route middleware
const userRoutes = require("./Route/UserRoute");
app.use("/api/users", userRoutes);

//user route middleware files
const questionRoutes = require("./routes/userRoute");
//question route middleware
app.use("/api/question", questionRoutes);
//Answer routes middleware
async function start() {
  try {
    const result = await dbConnection.execute("select", "test");
    app.listen(PORT);
    console.log(`server is running  on port ${"PORT"}`);
    console.log(result);
  } catch (error) {
    console.log(err.message);
  }
}
start();

module.exports = app;
