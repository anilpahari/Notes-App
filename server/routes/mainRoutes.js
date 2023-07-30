const express = require("express");
const homepage = require("../controllers/homepage");
const about = require("../controllers/aboutControllers");
const dashboard = require("../controllers/dashboardControllers");
const auth = require("./auth");
const isLoggedIn = require("../middleware/checkAuth");
const addNotes = require("../controllers/addControllers");

const viewNotes = require("../controllers/viewControllers");
const updateNotes = require("../controllers/updateNotes");
const deleteNotes = require("../controllers/deleteNotes");
const notesSumbit = require("../controllers/noteSubmit");
const searchNote = require("../controllers/searchControllers");

const routes = express.Router();
routes.get("/", homepage);
routes.get("/about", about);
routes.get("/dashboard", isLoggedIn, dashboard);
routes.get("/dashboard/item/:id", isLoggedIn, viewNotes);
routes.post("/dashboard/item/:id", isLoggedIn, updateNotes);
routes.post("/dashboard/item-delete/:id", isLoggedIn, deleteNotes);
routes.get("/dashboard/add", isLoggedIn, addNotes);
routes.post("/dashboard/add", isLoggedIn, notesSumbit);

routes.post("/dashboard/search", isLoggedIn, searchNote);
module.exports = routes;
