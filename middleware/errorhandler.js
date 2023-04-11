

const {StatusCodes} = require('http-status-codes')

const errorhandler = (err , req , res , next) =>{
    customerror = {
        statuscode:err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'something went wrong , Try again later'
    }

    if(err.code && err.code === 11000){
        customerror.msg = 'Duplicate values entered for the email field , please choose another value'
        customerror.statuscode = 400
    }

    if(err.name === 'ValidationError'){
        customerror.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customerror.statuscode = 400
    }

    if(err.name === 'CastError'){
        customerror.msg = `There is no item with this id:${err.value}`
        customerror.statuscode = 404
    }

    res.status(customerror.statuscode).json({msg:customerror.msg})
}


module.exports = errorhandler



















