const User = require('../Model/userModel')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
require('dotenv').config()

exports.signup = (req,res)=>{
    User.findOne({email: req.body.email}).exec((err,user)=>{
        if(user) {
            return res.status(400).json({
                error:'Error is taken'
            })
        }

        const {name, email, password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLINT_URL}/profile/${username}`

        let newUser = new User({name, email, password, profile, username})
        newUser.save((err,success) => {
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json({
                message: 'Sigup success! Please signin.',
                user:success
            })
        })
    })

}


exports.signin = (req,res) =>{
    const {email,password} = req.body;
    //check if user exist
    User.findOne({ email }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exit. Please Signup.'
            })
        }
        //authenticate
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Password mismatch'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})

        res.cookie('token',token,{expiresIn:'1d'})
        const {_id, username, name, email, role} = user
        return res.json({
            token,
            user: {_id, username, name, email, role}
        })
    })


}


exports.signout = (req,res) =>{
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    })
}


exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})




