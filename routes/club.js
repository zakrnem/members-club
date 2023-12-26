const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")

// User routes

router.get("/user/create", userController.user_create_get)
router.post("/user/create", userController.user_create_post)

router.get("/user/join", userController.user_joinclub_get)
router.post("/user/join", userController.user_joinclub_post)

router.get("/user/login", userController.user_login_get)
router.get("/user/login", userController.user_login_post)

// Message routes

router.get("/", messageController.message_list)

module.exports = router