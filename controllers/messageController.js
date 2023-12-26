const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const decode = require("html-entities").decode;

exports.message_list = asyncHandler(async (req, res, next) => {
    res.render("index", {
        title: "Message list"
    })
})