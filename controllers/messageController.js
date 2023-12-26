const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const decode = require("html-entities").decode;

exports.message_list = asyncHandler(async (req, res, next) => {
    res.render("message_list", {
        title: "Message list"
    })
})

exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.render("message_form", {
        title: "New message"
    })
})

exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.render("message_form", {
        title: "New message"
    })
})

exports.message_update_get = asyncHandler(async (req, res, next) => {
    res.render("message_form", {
        title: "Update message"
    })
})

exports.message_update_post = asyncHandler(async (req, res, next) => {
    res.render("message_form", {
        title: "Update message"
    })
})