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
    error: false,
  });
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email})
  if (!existingUser) {
    if (req.body.password1 === req.body.password2) {
      bcrypt.hash(req.body.password2, 10, async (err, hashedPassword) => {
        try {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            membership: false,
          });
          const result = await user.save();
          res.redirect("/club/user/login");
        } catch (err) {
          debug(err)
          return next(err);
        }
      });
    } else {
      res.render("signup_form", {
        title: "Sign up",
        error: "Passwords do not match."
      });
    }  
  } else {
    res.render("signup_form", {
      title: "Sign up",
      error: "A user with the same email already exists."
    });
  }  
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