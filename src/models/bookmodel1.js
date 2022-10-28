const mongoose=require("mongoose")

const book1Schema=new mongoose.Schema({

    author_id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    ratings:{
        type:Number,
        required:true,
    },
},{timestamps:true})


module.exports=mongoose.model("AuthorBook",book1Schema)