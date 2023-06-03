const express = require('express')
const { signup, signin, signout, requireSignin } = require('../Controller/authController')
const authRoute = express.Router()

//validators
const { userSignupValidator, userSigninValidator } = require('../Validator/authValidator')
const { runValidation } = require('../Validator/indexvalidator')


authRoute.post('/signup',userSignupValidator,runValidation,signup)
authRoute.post('/signin',userSigninValidator,runValidation,signin)
authRoute.get('/signout',signout)
authRoute.get('/serect',requireSignin,(req,res)=>{
    res.json({
        msg:"Serect is find "
    })
})







module.exports = authRoute