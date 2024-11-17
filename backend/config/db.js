const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = () => {
  const USERNAME = process.env.DB_USERNAME;
  const PASSWORD = process.env.DB_PASSWORD;
  const DBName = process.env.DB_NAME;

  const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.xijumvr.mongodb.net/${DBName}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Error while connecting with the database ");
    });
  } catch (err) {
    console.log("error while connecting DB", MONGODB_URI);
  }
};
module.exports = ConnectDB;
