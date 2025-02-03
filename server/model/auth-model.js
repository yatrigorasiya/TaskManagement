const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false}
})

userSchema.pre("save",async function(next) {
    // console.log("userdata:",this)
    const user = this;
    if(!user.isModified("password")){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password,saltRound)
        user.password = hash_password
        
    } catch (error) {
        next(error)
        
    }
    
})


userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            username:this.username,
            isAdmin:this.isAdmin

        },
     
        process.env.SECRETE_KEY ,
        // taskmanagement,
    {
        expiresIn:'30d'

    })
        
    } catch (error) {
        console.log(error)
        
    }
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password)

}

const User = new mongoose.model("User",userSchema)
module.exports = User