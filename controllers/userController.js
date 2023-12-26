const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const decode = require("html-entities").decode;

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("signup_form", {
        title: "Sign up"
    })
})

exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.render("signup_form", {
        title: "Sign up"
    })
})

exports.user_joinclub_get = asyncHandler(async (req, res, next) => {
    res.render("joinclub_form", {
        title: "Join the club"
    })
})

exports.user_joinclub_post = asyncHandler(async (req, res, next) => {
    res.render("joinclub_form", {
        title: "Join the club"
    })
})

exports.user_login_get = asyncHandler(async (req, res, next) => {
    res.render("login_form", {
        title: "Log in"
    })
})

exports.user_login_post = asyncHandler(async (req, res, next) => {
    res.render("login_form", {
        title: "Log in"
    })
})