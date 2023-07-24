const about = async (req, res) => {
  const locals = {
    title: "About-NodeJs Notes",
    description: "Free NodeJs notes App",
  };
  res.render("about", locals);
};
module.exports = about;
