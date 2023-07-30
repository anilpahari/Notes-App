require("../models/databaseConnection");
const userModel = require("../models/userModel");
const passport = require("passport");
require("dotenv").config();
const express = require("express");
const authRoutes = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };
      try {
        let user = await userModel.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await userModel.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
//Google login Route
authRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
//retrive user data
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
  })
);
///if something went wrong.....
authRoutes.get("/login-failure", (req, res) => {
  res.send("Something went wrong.....");
});
//destroy user session..
authRoutes.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.send("Erro loggin out..");
    } else {
      res.redirect("/");
    }
  });
});
//persist user data after sucessfully authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//retrive user data from session..
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = authRoutes;
