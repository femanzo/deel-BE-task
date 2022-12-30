const { Router } = require('express')
const { jobsController } = require('../controllers')
const { getProfile } = require('../middlewares')

const router = Router()

router.get('/unpaid', getProfile, jobsController.getUserUnpaidJobsRequest)
router.post('/:job_id/pay', getProfile, jobsController.payJobRequest)

module.exports = router
