

const customapierror = require('./customerror')

class notfounderror extends customapierror{
    constructor(message){
        super(message)
        this.statusCodes = 404
    }
}

module.exports = notfounderror


























