const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const {authenticate,authorise}=require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.status(400).send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.login)

//The userId is sent by front end
router.get("/users/:userId",authenticate,authorise, userController.getUserData)
router.post("/users/:userId/posts",authenticate,authorise, userController.userPost)

router.put("/users/:userId",authenticate,authorise, userController.updateUserData)

module.exports = router;