const express = require("express")
const { register, login, user } = require("../controller/auth-controller")
const signupSchema = require("../validator/auth-validation")
const validate = require("../middleware/validate-middleware")
// const authenticate = require("../middleware/auth-middleware")
const authmiddlware = require("../middleware/auth-middleware")


const router = express.Router()

router.route("/register").post(validate(signupSchema),register)
router.route("/login").post(validate(signupSchema),login)
router.route("/user").get(authmiddlware,user)

module.exports = router