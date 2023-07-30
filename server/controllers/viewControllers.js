const notesModel = require("../models/notesModel");
const viewNotes = async (req, res) => {
  const noteID = req.params.id;
  const note = await notesModel
    .findById({ _id: noteID })
    .where({ user: req.user.id })
    .lean();
  if (note) {
    res.render("view-notes", {
      noteID,
      note,
      layout: "./layouts/dashboard",
    });
  } else {
    res.send("Something went wrong ");
  }
};
module.exports = viewNotes;
