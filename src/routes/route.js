const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})
//Get-API Problem 1
router.get('/movies', function(req,res){
     console.log("The path params in the request are : ", req.params)
     const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    res.send(movies)
})

////Get-API Problem 2

router.get('/movies/:indexNumber',function(req,res){
    const index=req.params.indexNumber
    const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    res.send(movies[index])
})
//Get-API Problem 3
router.get('/movies/:indexNumber',function(req,res){
    const index=req.params.indexNumber
    const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    if(index>(movies.length-1)&&Number(index)>=0){
        res.send ("Invalid index")
    }
    else{
        res.send(movies[index])
    }
    
})
//Get-API Problem 4
const movie=[ {
    id: 1,
    name: 'The Shining'
   }, {
    id: 2,
    name: 'Incendies'
   }, {
    id: 3,
    name: 'Rang de Basanti'
   }, {
    id: 4,
    name: 'Finding Nemo'
   }]
   router.get('/films', function(req,res){

    res.send(movie)
   })

//Get-API Problem 5
const movies=[ {
    id: 1,
    name: 'The Shining'
   }, {
    id: 2,
    name: 'Incendies'
   }, {
    id: 3,
    name: 'Rang de Basanti'
   }, {
    id: 4,
    name: 'Finding Nemo'
   }]
   router.get('/film/:filmId',function(req,res){
   const id=req.params.filmId
   const moviearr=movies.find(film=>film.id=id)
   if(moviearr)
   {
    res.send(moviearr)
   }

   else{
    res.send("No movie exist with this id")
   }
   })
// Example 1 for path params
router.get('/students/:studentName', function(req, res){
    // ':' denotes that the following part of route is a variable
    // The value of this variable is what we are sending in the request url after /students
    // This value is set in the form of an object inside req.params
    // The object contain key value pairs
    // key is the variable in the route
    // value is whatever dynamic value sent in the request url
    let myParams = req.params

    // params attribute is fixed in a request object
    // params contains the path parameters object
    console.log("The path params in the request are : ", myParams)
    res.send('The full name is ' + myParams.studentName )
})

// Example 2 for path params
router.get('/student-details/:name', function(req, res){
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Dummy response')
})

module.exports = router;