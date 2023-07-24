require("/.env");
const passport = require("passport");
const express = require("express");
const routes = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
    }
  )
);
//Google login Route
routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
//retrive user data
routes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);
module.exports = routes;
