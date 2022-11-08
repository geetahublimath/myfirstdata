const jwt=require("jsonwebtoken")
const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    try{
    let token=req.headers["x-auth-token"]
    if(!token)
        return res.status(404).send({status:false,msg:"token must be required"})
    
    let decodedToken=jwt.verify(token,"lithium-final")
    if(!decodedToken){
        return res.status(401).send({status:false,msg:"Access Denied"})
    }
    req.loggedInUser=decodedToken.userId
    next()
}catch(err){
    res.status(500).send({msg:"Access Denied"})
}
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    try{
    let checkAuthorise=req.params.userId
    if(checkAuthorise!==req.loggedInUser){
        return res.status(403).send({status:false,msg:"You are not valid user"})
    }
    next()
}catch(error){
    return res.status(500).send({message:error.message})
}
}

module.exports.authenticate=authenticate
module.exports.authorise=authorise