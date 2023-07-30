const notesModel = require("../models/notesModel");
const updateNotes = async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  try {
    await notesModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: title,
        body: body,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
module.exports = updateNotes;
