const express = require('express')
const { time } = require('../Controller/blogController')
const blogRoute = express.Router()


blogRoute.get('/',time)

module.exports = blogRoute