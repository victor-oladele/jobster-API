
// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const userschema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true , 'pls provide your name'],
//         minlength:3
//     },
//     email:{
//         type:String,
//         required:[true , 'pls provide your email'],
//         unique:true
//     },
//     password:{
//         type:String,
//         required:[true , 'pls provide your password']
//     },
//     lastname:{
//         type:String,
//         default:'last name'
//     },
//     location:{
//         type:String,
//         default:'my city'
//     }
// })

// userschema.pre('save' , async function(){
//     if(!this.isModified('password')) return
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password , salt)
// })

// userschema.methods.comparepassword = async function(candidatepassword){
//     const ismatch = await bcrypt.compare(candidatepassword , this.password)
//     return ismatch
// }

// userschema.methods.createjwt = function(){
//    return jwt.sign({userid:this._id , name:this.name} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIREDIN} )
// }



// module.exports = mongoose.model('USER2' , userschema)


const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'please provide your name'],
        minlength:3
    },
    email:{
        type:String,
        required:[true , 'please provide your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true , 'please provide your password'],
        
    },
    lastname:{
        type:String,
        default:'last name' 
    },
    location:{
        type:String,
        default:'my city'
    }
})

userschema.pre('save' , async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

userschema.methods.createjwt = function(){
    return jwt.sign({userid:this._id , name:this.name} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIREDIN})
}

userschema.methods.comparepassword = async function(candidatepassword){
    const ismatch = await bcrypt.compare(candidatepassword , this.password)
    return ismatch
}


module.exports = mongoose.model('user2' , userschema)














































































