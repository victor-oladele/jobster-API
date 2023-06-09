


const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const {badrequesterror , notfounderror , authenticatederror} = require('../errors')


const register = async(req , res) =>{
    const user = await User.create(req.body)
    const token = user.createjwt()
    res.status(StatusCodes.CREATED).json({ user , token } )
}
const login = async(req , res) =>{
    const {email , password} = req.body
    if(!email || !password){
      throw new badrequesterror('email and password fields cannot be empty')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new authenticatederror('Invalid credentials')
    }
    const ispasswordmatch = await user.comparepassword(password)
    if(!ispasswordmatch){
        throw new authenticatederror('Invalid credential')
    }
    const token = user.createjwt()
    res.status(StatusCodes.OK).json({ user , token })
}

const updateprofile = async(req , res) =>{
    const {name , email , location , lastname} = req.body
    if(!email || !name || !lastname || !location){
       throw new badrequesterror('pls povide all values') 
    }
    const user = await User.findOneAndUpdate({_id:req.user.userid} , req.body , {
        new:true,
        runValidators:true
    })
    await user.save()
    res.status(StatusCodes.OK).json({user:{
        name:user.name,
        email:user.email,
        lastname:user.lastname,
        location:user.location
    }})

}


module.exports = {
    register,
    login,
    updateprofile
}





























