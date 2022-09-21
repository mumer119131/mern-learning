const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({path : './config.env'})
require('./db/conn.js')
app.use(express.json())
app.use(require('./Router/auth'))

const PORT = process.env.PORT 

const middleware = (req, res, next) =>{
    console.log('middleware')
    next()
}


app.listen(PORT, ()=> console.log(`Server is listening at PORT ${PORT}`))