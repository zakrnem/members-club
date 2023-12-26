const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/User")

exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).populate("user").exec()
  allMessages.forEach((message) => {
    message = decodeURIComponent(message)
  })
  res.render("message_list", {
    title: "Message list",
    message_list: allMessages,
    member: true,
    admin: true,
  });
});

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "New message",
  });
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "New message",
  });
});

exports.message_update_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "Update message",
  });
});

exports.message_update_post = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "Update message",
  });
});
