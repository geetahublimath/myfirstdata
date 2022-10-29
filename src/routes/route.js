const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const newBookController=require("../controllers/newBookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

router.post("/createNewAuthor",newBookController.createNewAuthor)

router.get("/getNewAuthor",newBookController.getNewAuthor)
 
router.post("/createNewBook",newBookController.createNewBook)

router.get("/getNewBook",newBookController.getNewBook)

router.post("/createNewPublisher",newBookController.createNewPublisher)

router.get("/getNewPublisher",newBookController.getNewPublisher)




module.exports = router;