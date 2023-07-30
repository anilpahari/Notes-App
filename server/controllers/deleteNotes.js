const notesModel = require("../models/notesModel");

const deleteNotes = async (req, res) => {
  const id = req.params.id;

  try {
    await notesModel.deleteOne({ _id: id });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ error: "Error deleting the note." });
  }
};

module.exports = deleteNotes;
