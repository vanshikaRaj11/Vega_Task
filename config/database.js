const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed", error);
      console.log(error);
      process.exit(1);
    });
};
