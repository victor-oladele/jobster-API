
// const customapierror = require('./customerror')


// class authenticatederror extends customapierror{
//     constructor(message){
//         super(message)
//         this.statusCodes = 401
//     }

// }

// module.exports = authenticatederror


const customapierror = require('./customerror')

class authenticatederror extends customapierror{
    constructor(message){
        super(message)
        this.statusCodes = 401
    }
}

module.exports = authenticatederror


























