

// const express = require('express')
// const router = express.Router()
// const {register , login , updateprofile} = require('../controller/auth')
// const authmiddleware = require('../middleware/authmiddleware')
// const ratelimiter = require('express-rate-limit')


// const apilimiter = ratelimiter({
//       windowMs:15 * 60 * 1000,
//       max:15,
//       message:{
//             msg:'Too many request from this ip , please try again in 15minutes'
//       }
// })



// router.route('/register')
//       .post(apilimiter ,  register)


// router.route('/login')
//       .post(apilimiter , login)


// router.route('/:id')
//       .patch(authmiddleware , updateprofile)

// module.exports = router


const express = require('express')
const router = express.Router()
const {register , login , updateprofile} = require('../controller/auth')
const {authmiddleware} = require('../middleware/authmiddleware')


router.route('/register')
      .post(register)
     
      
router.route('/login')
      .post(login)
     

router.route('/:id')
      .patch(authmiddleware ,  updateprofile)



module.exports = router
     
























