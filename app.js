


require('dotenv').config()
require('express-async-errors')


const express = require('express')
const connectdb = require('./db/connects')
const app = express()


const port = process.env.PORT || 3500

// error handler
const errorhandler = require('./middleware/errorhandler')
const notfound = require('./middleware/notfound')


// routes
const userroute = require('./routes/user')
const jobroute = require('./routes/job')

app.set('trust proxy', 1);

// security packages
const helmet = require('helmet');
const xss = require('xss-clean');

const {authmiddleware} = require('./middleware/authmiddleware')


app.use(express.json())


app.use(helmet());
app.use(xss());

app.get('/', (req, res) => {
    res.send('<h1>Jobster API</h1><a href="/api-docs">Documentation</a>');
  });


app.use('/api/v1/auth' , userroute)
app.use('/api/v1/jobs' ,  authmiddleware ,  jobroute)

app.use(errorhandler)
app.use(notfound)
const start = async() =>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()







