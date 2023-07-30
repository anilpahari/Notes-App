const notesModel = require("../models/notesModel");

const addNotes = async (req, res) => {
  res.render("addNotes", { layout: "../views/layouts/dashboard" });
};
module.exports = addNotes;
