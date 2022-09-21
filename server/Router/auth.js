const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
require("../db/conn.js")

const User = require('../models/userSchema.js')

router.get('/', (req, res)=>{
    res.send('HomePage')
})


router.post('/register', async (req, res)=>{
    
    // User.findOne({email : email})
    // .then((userExist)=>{
        //     if(userExist){
            //         return res.status(422).json({error : "User already exist"})
    //     }
    //     const user = new User({name, email, phone, work, password, cpassword})
    //     user.save()
    //     .then(()=>{
        //         res.status(201).json({message : "User creation Successful"})
        //     }).catch(()=> res.status(500)).json({error : "Failed to register User"})
        // }).catch((error)=> console.log(error))
        
        
    try {
        const {name, email, phone, work, password, cpassword} = req.body
        if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error : "Enter the required fields."})
        }

        const userExist = await User.findOne({email : email})
        if(userExist){
            return res.status(422).json({error : "User already exist"})
        }else if(password != cpassword){
            return res.status(422).json({error : "Password didn't match"})
        }else{
            const user = User({name, email, phone, work, password, cpassword})
    
            await user.save()
            return res.status(201).json({message : "User creation Successful"})
        }
        
        
    } catch (error) {
        console.log(error)
    }

})

router.post('/signin', async (req,res)=>{
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(422).json({error : "Enter the required fields."})
        }

        const userLogin = await User.findOne( {email : email} )
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            
            if(!isMatch){
                return res.status(422).json({error : "Invalid Credientials"})
            }else{
                res.status(200).json({message : "Success"})
            }
        }else{
            return res.status(422).json({error : "Invalid Credientials"})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router
