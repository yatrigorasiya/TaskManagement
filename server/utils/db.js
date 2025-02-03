const mongoose = require("mongoose")
const uri = "mongodb+srv://yatrigorasiya:yatri123@cluster0.jorqi.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0"
const connectDb = async()=>{
    try {
        await mongoose.connect(uri)
        console.log("connection succesfully")
        
    } catch (error) {
        console.error("connection faile")
        process.exit(0)
        
    }

}
module.exports = connectDb