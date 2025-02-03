require("dotenv").config()
const express = require("express")
const cors = require("cors")

const router = require("./router/auth-router")
const taskrouter = require("./router/task-router")
const connectDb = require("./utils/db")
const errormiddleware = require("./middleware/error-middleware")
const app = express()
const corsoption = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PATCH,PUT,DELETE,HEAD",
    Credentials:true
}

app.use(cors(corsoption))


app.use(express.json())
app.use("/api/auth",router)
app.use("/api/task",taskrouter)
app.use(errormiddleware)
const PORT = 3004

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running port http://localhost:${PORT}`)
    })

})
