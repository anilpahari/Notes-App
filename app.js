const express = require("express");

const expressLayouts = require("express-ejs-layouts");
const routes = require("./server/routes/mainRoutes");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//static files
app.use(express.static("public"));
//templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
require("./server/models/databaseConnection.js");
app.use("/", routes);
app.use("/", "./server/routes/auth.js");

//Page Not Found
app.get("*", (req, res) => {
  res.status(404).render("error.ejs");
});

app.listen(8000, () => {
  console.log("Server started at 8000 port");
});
