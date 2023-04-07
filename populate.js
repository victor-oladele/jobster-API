// require('dotenv').config()
// const jobmodel = require('./model/jobs')
// const jobdata = require('./mockdata.json')
// const connectdb = require('./db/connects')











// const start = async(req , res) =>{
//     try {
//         await connectdb(process.env.MONGO_URI)
//        await jobmodel.create(jobdata)
//        console.log('success!')
//        process.exit(0)
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
// }

// start()
require('dotenv').config()
const connectdb = require('./db/connects')
const jobmodel = require('./model/jobs')
const jsondata = require('./mockdata.json')






const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        jobmodel.create(jsondata)
        console.log('successful')
    } catch (error) {
        console.log(error)
    }
}

start()
























