const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const decode = require("html-entities").decode;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const debug = require("debug")("user");

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("signup_form", {
    title: "Sign up",
  });
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.render("signup_form", {
        title: "Sign up",
      });
    } catch (err) {
      return next(err);
    }
  });
});

exports.user_joinclub_get = asyncHandler(async (req, res, next) => {
  res.render("joinclub_form", {
    title: "Join the club",
  });
});

exports.user_joinclub_post = asyncHandler(async (req, res, next) => {
  res.render("joinclub_form", {
    title: "Join the club",
  });
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login_form", {
    title: "Log in",
    error: false,
  });
});

exports.user_login_post = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    req.login(user, (err) => {
      try {
        if (user) {
          res.redirect("/");
        } else {
          res.render("login_form", {
            title: "Log in",
            error:
              "The username or password you entered is incorrect. Please double-check your login credentials and try again.",
          });
        }
      } catch (err) {
        debug(err);
      }
    });
  })(req, res, next);
});

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  res.render("logout", {
    title: "Log out",
  });
})

exports.user_logout_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})