const mongoose = require("mongoose");
require("./userModel");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongo_connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to mongo-db sucessful.");
  })
  .catch((e) => {
    console.log("Connectio Failed....", +e);
  });
