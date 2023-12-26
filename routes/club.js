const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")



// User routes

router.get("user/create", userController.user_create_get)
router.post("user/create", userController.user_create_post)

// Message routes

router.get("/", messageController.message_list)

module.exports = router