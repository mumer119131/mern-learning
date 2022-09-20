const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({path : './config.env'})
require('./db/conn.js')


const PORT = process.env.PORT 




const middleware = (req, res, next) =>{
    console.log('middleware')
    next()
}

app.get('/', (req, res)=>{
    res.send('Hello World')
})
app.get('/about',middleware, (req, res)=>{
    res.send('About')
})
app.get('/contact', (req, res)=>{
    res.send('Contact')
})
app.get('/signin', (req, res)=>{
    res.send('Signin')
})
app.get('/signup', (req, res)=>{
    res.send('Signup')
})


app.listen(PORT, ()=> console.log(`Server is listening at PORT ${PORT}`))