

const customapierror = require('./customerror')

class badrequesterror extends customapierror{
    constructor(message){
        super(message)
        this.statusCodes = 400
    }
}

module.exports = badrequesterror
























