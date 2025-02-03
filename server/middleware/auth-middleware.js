const User = require("../model/auth-model")
const jwt = require("jsonwebtoken")
const authmiddlware = async(req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({message:"Unauthorizes HTTP, Token not provided"})
    }

    const jwtToken = token.replace("Bearer","").trim();
    console.log("token from middleware",jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken,process.env.SECRETE_KEY );
        const userData = await User.findOne({username:isVerified.username})
      console.log(userData)
      req.user = userData;
      req.token = token;
      req.id = userData._id;
    next()
        
    } catch (error) {
        return res.status(401).json({message:"Unaythorized.Invalid token"})
    
        
    }

}

module.exports = authmiddlware;
