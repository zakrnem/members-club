const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

// User routes

router.get("/user/create", userController.user_create_get);
router.post("/user/create", userController.user_create_post);

router.get("/user/join", userController.user_joinclub_get);
router.post("/user/join", userController.user_joinclub_post);

router.get("/user/login", userController.user_login_get);
router.post("/user/login", userController.user_login_post);

router.get("/user/logout", userController.user_logout_get)
router.post("/user/logout", userController.user_logout_post)

// Message routes

router.get("/", messageController.message_list);

router.get("/message/create", messageController.message_create_get);
router.post("/message/create", messageController.message_create_post);

router.get("/message/update", messageController.message_update_get);
router.post("/message/update", messageController.message_update_post);

module.exports = router;
