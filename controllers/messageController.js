const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).populate("user").sort({ date: -1 }).exec();
  allMessages.forEach((message) => {
    message = decodeURIComponent(message);
  });
  const localUser = res.locals.currentUser;
  let fullname;
  let member;
  let admin;
  if (localUser) {
    const user = await User.findById(localUser._id);
    fullname = user.fullname;
    member = user.membership === "true";
    admin = user.membership === "admin";
  } else {
    member = false;
    admin = false;
  }

  res.render("message_list", {
    title: "Message list",
    message_list: allMessages,
    member: member,
    admin: admin,
    user: fullname,
  });
});

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    title: "New message",
  });
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    user: res.locals.currentUser._id,
    message: req.body.message,
  })
  await message.save()
  res.redirect("/");
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
