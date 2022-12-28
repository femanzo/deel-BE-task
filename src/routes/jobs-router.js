const { Router } = require('express')
const { jobsController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = Router()

router.get('/unpaid', authMiddleware, jobsController.getUserUnpaidJobsRequest)
router.post('/:job_id/pay', authMiddleware, jobsController.payJobRequest)

module.exports = router
