const express = require("express");
require("dotenv").config();
//const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./server/routes/mainRoutes");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
const authRoutes = require("./server/routes/auth");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "Hello world",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      client: MongoClient.connect(process.env.mongo_connect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
//static files
app.use(express.static("public"));
//templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
require("./server/models/databaseConnection.js");
app.use("/", routes);
app.use("/", authRoutes);

//Page Not Found
app.get("*", (req, res) => {
  res.status(404).render("error.ejs");
});

app.listen(8000, () => {
  console.log("Server started at 8000 port");
});
