const {z} = require("zod")
const signupSchema = z.object({
    username:z
    .string({required_error:"Name is require"}).trim().min(3,{message:"username must be at least 3 character"}).max(255,{message:"username more than 255 character"}),
    password:z
    .string({required_error:"password is require"}).trim().min(7,{message:"password must be at least 6 character"}).max(255,{messsage:"password more than 255 character"}),

})

module.exports = signupSchema