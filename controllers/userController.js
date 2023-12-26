const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const decode = require("html-entities").decode;

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("signup_form", {
        title: "Sign in"
    })
})

exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.render("signup_form", {
        title: "Sign in"
    })
})