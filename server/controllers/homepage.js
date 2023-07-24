const homepage = (req, res) => {
  const locals = {
    title: "NodeJs Notes",
    description: "Free NodeJs notes App",
  };
  res.render("home", { locals, layout: "../views/layouts/frontpage.ejs" });
};
module.exports = homepage;
