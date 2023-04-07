
// const express = require('express')
// const router = express.Router()
// const {getajob , getalljobs , deletejobs , createjobs , updatejobs} = require('../controller/jobs')


// router.route('/')
//       .post(createjobs)
//       .get(getalljobs)


// router.route('/:id')
//       .get(getajob)
//       .patch(updatejobs)
//       .delete(deletejobs)


// module.exports = router


const express = require('express')
const router = express()
const {getalljobs , getjob , createjobs , updatejobs , deletejobs, showstats} = require('../controller/jobs')



router.route('/')
      .post(createjobs)
      .get(getalljobs)

router.route('/stats')
      .get(showstats)

router.route('/:id')
      .get(getjob)
      .patch(updatejobs)
      .delete(deletejobs)



module.exports = router






















