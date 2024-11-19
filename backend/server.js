const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db.js");
const errorHandler = require("./middlewares/errorHandler.js");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
dotenv.config();
ConnectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listen to the port ${port}`);
});
