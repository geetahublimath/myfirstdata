const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{
  let data = req.body;
  let savedData = await userModel.create(data);
  res.status(201).send({ msg: savedData });
}catch(error){
  return res.status(500).send({message:error.message})
}
}

const login = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({status: false,msg: "username & password must be required",});

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      
    },
    "lithium-final"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
}catch(error){
  return res.status(500).send({message:error.message})
}
}

const getUserData = async function (req, res) {
  try{
  let userId=req.params.userId
  let userDetails=await userModel.findById(userId)

  if(!userDetails)
    return res.send({status:false,msg:"No such user exists"})
    res.status(200).send({status:true,data:userDetails})
}catch(error){
  return res.status(500).send({message:error.message})
}
}


const updateUserData= async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!userDetails) {
    return res.status(401).send({status:false,msg:"No such user exists"});
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(204).send({ status: updatedUser, data: updatedUser });
}catch(error){
  return res.status(500).send({message:error.message})
}
}
const userPost=async(req,res)=>{
  try{
  let user=await userModel.findById(req.params.userId)
  const message=req.body.message
  const updatedPost=user.posts
  updatedPost.push(message)
  const updatedData=await userModel.findOneAndUpdate({_id:user._id},{posts:updatedPost},{new:true})
  res.status(201).send({status:true,posts:updatedData})
}catch(error){
  return res.status(500).send({message:error.message})
}
}
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUserData = updateUserData;
module.exports.login = login;
module.exports.userPost = userPost
