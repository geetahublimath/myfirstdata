const book1Model=require("../models/bookmodel1")
const author1Model=require("../models/authorModel")

const createBooks=async function(req,res){
    let data=req.body
    let savedData=await book1Model.create(data)
    res.send({msg:savedData})
}
const getAuthorBook=async function(req,res){
    let allUsers=await book1Model.find()
    res.send({msg:allUsers})
}

const getAuthorBookList=async function(req,res){
    let arr1=await author1Model.find({author_name:"Chetan Bhagat"})
    const[obj]=arr1
    let id =obj.author_id
    let allbooks=await book1Model.find({author_id:id})
    res.send({msg:allbooks})
}
const updateBookPrice=async function(req,res){
    let obj1=await book1Model.findOne({name:"Two states"})
    let id=obj1.author_id
    let obj2=await author1Model.findOne({author_id:id}).select({author_name:1,_id:0})
    let allBooks=await book1Model.findOneAndUpdate(
        {name:"Two states"},
        {$set:{price:100}},
        {new:true},
    ).select({price:1,id:0})

    res.send({msg:[obj2,allBooks]})
}

const bookCost=async function(req,res){
    let allbooks=await book1Model.find({price:{$gte:50,$lte:100}})
    let saveData=[]

    for(index of allbooks){
        let data=await author1Model.findOne({author_id:(index.author_id)}).select({author_name:1,_id:0})
        saveData.push(index)
        saveData.push(data)
    }
    res.send({msg:saveData})
}
module.exports.createBooks=createBooks
module.exports.getAuthorBook=getAuthorBook
module.exports.getAuthorBookList=getAuthorBookList
module.exports.updateBookPrice=updateBookPrice
module.exports.bookCost=bookCost