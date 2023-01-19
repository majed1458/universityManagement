const express = require("express");
const logger = require("morgan");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = require("./src/Routes/AllRoutes");
const connectDB = require("./src/config/DB");
//------------------------------------------------
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//------------------------------------------------
require("dotenv").config();
connectDB();



app.use("/api/v0.1", router);
app.use("*", (req, res) => {
  res.status(404).send("This route doesnt exist");
});
//------------------------------------------------
app.listen(8080, () => {
  console.log("listenning on port : 8080");
});
