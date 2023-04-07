// const mongoose = require('mongoose')


// const connectdb = (uri) =>{
//     return mongoose.connect(uri)
// }



// module.exports = connectdb




const mongoose = require('mongoose')

const connectdb = (url) => {
    mongoose.connect(url)
}

module.exports = connectdb


























