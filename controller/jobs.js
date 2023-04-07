// const {StatusCodes} = require('http-status-codes')
// const {notfounderror , badrequesterror} = require('../errors')



// const Job = require('../model/jobs')


// const getalljobs = async(req , res)=>{


//    const {status , position , jobtype , sort} = req.query
//     const queryobject = {createdby:req.user.userid}
//     if(position){
//         queryobject.position = {$regex:position , $options:'i'}
//     }
//     if(status && status !== 'all'){
//         queryobject.status = status
//     }
//     if(jobtype && jobtype !== 'all'){
//         queryobject.jobtype = jobtype
//     }
//     let result = Job.find(queryobject)

//     if(sort === 'latest'){
//         result = result.sort('createdAt')
//     }
//     if(sort === 'oldest'){
//         result = result.sort('-createdAt')
//     }
//     if(sort === 'a-z'){
//         result = result.sort('position')
//     }
//     if(sort === 'z-a'){
//         result = result.sort('-position')
//     }

//     // pagination
//     const page = Number(req.query.page) || 1
//     const limit = Number(req.query.limit) || 10
//     const skip = (page - 1) * limit
    
//     const jobs = await result.skip(skip).limit(limit)
//     const totaljobs = await Job.countDocuments(queryobject)
//     const numofpages = Math.ceil(totaljobs/limit)


//     res.status(StatusCodes.OK).json({jobs, totaljobs , numofpages })
// }


// const getajob = async(req , res)=>{
//    const {user:{userid} , params:{id:jobid}} = req
//    const job = await Job.findOne({_id:jobid , createdby:userid})
//    if(!job){
//       throw new notfounderror(`There is no id with this job:${jobid}`)
//    }
//    res.status(StatusCodes.OK).json({ job })
// }

// const createjobs = async(req , res)=>{
//     req.body.createdby = req.user.userid
//     const job = await Job.create(req.body)
//     res.status(StatusCodes.CREATED).json({ job })
// }



// const updatejobs = async(req , res)=>{
//     const {body:{company , position}  ,  user:{userid} , params:{id:jobid}} = req
//     if(!company || !position){
//        throw new badrequesterror('Company and position field cannot be empty')
//     }
//    const job = await Job.findOneAndUpdate({_id:jobid , createdby:userid}  , req.body , {
//     runValidators:true,
//     new:true
//    })
//    if(!job){
//       throw new notfounderror(`There is no id with this job:${jobid}`)
//    }
//    res.status(StatusCodes.OK).json({ job })
// }


// const deletejobs = async(req , res)=>{
//     const {user:{userid} , params:{id:jobid}} = req
//    const job = await Job.findByIdAndRemove({_id:jobid , createdby:userid})
//    if(!job){
//       throw new notfounderror(`There is no id with this job:${jobid}`)
//    }
//    res.status(StatusCodes.NO_CONTENT).send()
// }




// module.exports = {
//     getajob,
//     getalljobs,
//     createjobs,
//     updatejobs,
//     deletejobs
// }


const Job = require('../model/jobs')
const {StatusCodes} = require('http-status-codes')
const { badrequesterror , notfounderror} = require('../errors')
const mongoose = require('mongoose')

const getalljobs = async(req , res)=>{
   
const {position , jobtype , status , sort} = req.query
const queryobject = {createdby:req.user.userid}

if(position){
  queryobject.position = {$regex:position , $options:'i'}
}

if(status && status !== 'all'){
    queryobject.status = status
}

if(jobtype && jobtype !== 'all'){
    queryobject.jobtype = jobtype
}

let result = Job.find(queryobject)

if(sort === 'latest'){
    result = result.sort('createdAt')
}
if(sort === 'oldest'){
    result = result.sort('-createdAt')
}
if(sort === 'a-z'){
    result = result.sort('position')
}
if(sort === 'z-a'){
    result = result.sort('-position')
}

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page - 1) * limit


const jobs = await result.skip(skip).limit(limit)
const totaljobs = await Job.countDocuments(queryobject)
const numberofpages = Math.ceil(totaljobs/limit)


res.status(StatusCodes.OK).json({ jobs , totaljobs , numberofpages})

}


const getjob = async(req , res)=>{
    const {user:{userid} , params:{id:jobid}} = req
    const job = await Job.findOne({_id:jobid , createdby:userid})
    if(!job){
        throw new notfounderror(`There is no job with the id:${jobid}`)
    }

    res.status(StatusCodes.OK).json({ job })
}


const createjobs = async(req , res)=>{
    req.body.createdby = req.user.userid
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}


const updatejobs = async(req , res)=>{
    const {body:{company , position}  , user:{userid} , params:{id:jobid}} = req
    if(!company || !position){
        throw new badrequesterror('company and position fields cannot be empty')
    }
    const job = await Job.findOne({_id:jobid , createdby:userid} , req.body , {
        new:true,
        runValidators:true
    })
    if(!job){
        throw new notfounderror(`There is no job with the id:${jobid}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const deletejobs = async(req , res)=>{
    const {user:{userid} , params:{id:jobid}} = req
    const job = await Job.findOneAndRemove({_id:jobid , createdby:userid})
    if(!job){
        throw new notfounderror(`There is no job with the id:${jobid}`)
    }

    res.status(StatusCodes.NO_CONTENT).send()
}


// const showstats = async(req, res)=>{
//     let stats = await Job.aggregate([
//         {$match:{createdby:mongoose.Types.ObjectId(req.user.userid)}},
//         {$group:{_id:'$status' , count:{$sum: 1 }}} ,
//     ])
    

//     stats = stats.reduce((acc , curr)=>{
//         const {_id:title , count} = curr
//         acc[title] = count
//         return acc
//     },{});
       
//       console.log(stats)

//     const defaultstats ={
//         pending:stats.pending || 0,
//         interview:stats.interview || 0,
//         declined:stats.declined || 0
//     }
     
//     res.status(StatusCodes.OK).json({ defaultstats , monthlyapplication: []})
// }

const showstats = async(req , res) =>{
    let stats = await Job.aggregate([
        {$match:{createdby:mongoose.Types.ObjectId(req.user.userid)}},
        {$group:{_id:'$status' , count:{$sum: 1}}}
    ])

    stats = stats.reduce((acc , curr)=>{
        const {_id:title , count} = curr
        acc[title] = count
        return acc
    } , {})

    const defaultstats = {
        pending:stats.pending || 0 ,
        interview:stats.interview || 0 ,
        declined:stats.declined || 0
    }

    res.status(StatusCodes.OK).json({ defaultstats , monthlyapplication:[]})
}



module.exports = {
    getalljobs,
    getjob,
    createjobs,
    updatejobs,
    deletejobs,
    showstats
}























