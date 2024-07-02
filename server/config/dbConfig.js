const { log } = require("console");
const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

connection.on("error", (err) => {
  console.log("Mongo Db Connection Failed");
  console.error(err); // Log the error for further debugging
});

module.exports = connection;
