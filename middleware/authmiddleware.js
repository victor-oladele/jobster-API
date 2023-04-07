
// const jwt = require('jsonwebtoken')
// const {authenticatederror} = require('../errors')


// const authmiddleware = (req , res , next)=>{
//     const authheader = req.headers.authorization
//     if(!authheader || !authheader.startsWith('Bearer ')){
//         throw new authenticatederror('authentication errors')
//     }
//     const token = authheader.split(' ')[1]
//     try {
//         const payload = jwt.verify(token , process.env.JWT_SECRET)
//         req.user = {userid:payload.userid , name:payload.name}
//         next()
//     } catch (error) {
//         throw new authenticatederror('authentication errors')
//     }
// }



// module.exports = authmiddleware

const jwt = require('jsonwebtoken')
const {authenticatederror} = require('../errors')

const authmiddleware = (req , res , next) =>{
    const authheader = req.headers.authorization
    if(!authheader || !authheader.startsWith('Bearer ')){
       throw new authenticatederror('Authentication error')
    }
    const token = authheader.split(' ')[1]
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {userid:payload.userid , name:payload.name}
        next()
    } catch (error) {
        throw new authenticatederror('Authentication error')
    }
}

    module.exports = {authmiddleware}

























