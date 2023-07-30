const notesModel = require("../models/notesModel");
const mongoose = require("mongoose");

const dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;
  const locals = {
    title: "Dashboard-NodeJs Notes",
    description: "Free NodeJs notes App",
  };

  try {
    const aggregateQuery = [
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $match: { user: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $project: {
          title: {
            $substr: ["$title", 0, 30],
          },
          body: {
            $substr: ["$body", 0, 100],
          },
        },
      },
    ];

    const notes = await notesModel
      .aggregate(aggregateQuery)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await notesModel.countDocuments();

    res.render("dashboard", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = dashboard;
