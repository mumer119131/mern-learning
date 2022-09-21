const bcrypt = require('bcryptjs')
const mongoose  = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true
    },
    email : {
        type : String,
        requried : true
    },
    phone : {
        type : Number,
        requried : true
    },
    work : {
        type : String,
        requried : true
    },
    password : {
        type : String,
        requried : true
    },
    cpassword : {
        type : String,
        requried : true
    },
})



// Password Hashing

userSchema.pre('save', async function(next){
    console.log('called')
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
    
})

const User = mongoose.model('USER', userSchema)
module.exports = User;