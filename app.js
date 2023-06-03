const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const blogRoute = require('./Router/blogRouter')
const authRoute = require('./Router/authRouter')
const app = express()
dotenv.config()

if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin:`${process.env.CURRENT_URL}`}))
}

app.use(express.json())
app.use('/api/v1',authRoute)



module.exports = app