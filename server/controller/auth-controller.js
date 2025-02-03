const User = require("../model/auth-model")
const register = async(req,res)=>{
    try {
        console.log(req.body)
        const{username,password} = req.body
        const userExist = await User.findOne({username:username})
        if(userExist){
            return res.status(400).json({message:'already exists username'})
        }

        const usercreate = await User.create({username,password})
        res.status(200).json({message:usercreate,token:await usercreate.generateToken(),userId:usercreate._id.toString()})
        
    } catch (error) {
        res.status(500).json("internal server error")
        
    }

}
const login = async(req,res)=>{
    try {

        const {username,password} = req.body;

        const userExist = await User.findOne({username})

        if(!userExist){
            return res.status(400).json({message:"invalid credentials"})
        }
        const usercreate = await userExist.comparePassword(password)
        if(usercreate){
            res.status(200).json({message:"Login succesfully",token: await userExist.generateToken(),userId : userExist._id.toString()})
        }else{
            res.status(401).json("invalid server error")
        }




       
       
    } catch (error) {
        res.status(500).json("internal server error")
        
    }

}

const user = async(req,res)=>{
    try {
        const userData = req.user;
        console.log(userData)
        return res.status(200).json({message:userData})
        
    } catch (error) {
        console.log(error)
        
    }

}
module.exports = {register,login,user}

