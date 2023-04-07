
// const mongoose = require('mongoose')


// const jobschema = new mongoose.Schema({
//     company:{
//         type:String,
//         required:[true , 'pls provide the company']
//     },
//     position:{
//         type:String,
//         required:[true , 'pls provide the position']
//     },
//     status:{
//         type:String,
//         enum:['interview' , 'pending' , 'declined'],
//         default:'pending'
//     },
//     createdby:{
//         type:mongoose.Types.ObjectId,
//         ref:'users',
//         required:[true , 'pls provide users']
//     },
//     jobtype:{
//         type:String,
//         enum:['full-time' , 'part-time' , 'internship' , 'remote'],
//         default:'full-time'
//     },
//     joblocation:{
//         type:String,
//         default:'my city',
//         required:[true , 'provide the job location']
//     }
// },{timestamps:true})

// module.exports = mongoose.model('jobs' , jobschema)

const mongoose = require('mongoose')

const jobschema = new mongoose.Schema({
    company:{
        type:String,
        required:[true , 'pls provide company name'],
    },
    position:{
        type:String,
        required:[true , 'pls provide your position']
    },
    status:{
        type:String,
        enum:['pending' , 'interview' , 'declined'],
        default:'pending'
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true , 'pls provide the user']
    },
    jobtype:{
        type:String,
        enum:['full-time' , 'part-time' , 'intership' , 'remote'],
        default:'full-time'
    }
})

module.exports = mongoose.model('job2' , jobschema)















































