const dashboard = (req, res) => {
  const locals = {
    title: "Dashboard-NodeJs Notes",
    description: "Free NodeJs notes App",
  };
  res.render("dashboard", {
    locals,
    layout: "../views/layouts/dashboard",
  });
};
module.exports = dashboard;
