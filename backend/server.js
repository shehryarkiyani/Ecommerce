const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db.js");
const errorHandler = require("./middlewares/errorHandler.js");
dotenv.config();
ConnectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listen to the port ${port}`);
});
