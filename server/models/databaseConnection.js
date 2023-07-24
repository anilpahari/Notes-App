const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connection to mongo-db sucessful.");
  })
  .catch((e) => {
    console.log("Connectio Failed....", +e);
  });
