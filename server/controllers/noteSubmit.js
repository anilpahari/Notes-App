const notesModel = require("../models/notesModel");
const notesSumbit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await notesModel.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
module.exports = notesSumbit;
