import { Router } from 'express'
import { jobsController } from '../controllers'
import { getProfile } from '../middlewares'

const router = Router()
  .get('/unpaid', getProfile, jobsController.getUserUnpaidJobsRequest)
  .post('/:job_id/pay', getProfile, jobsController.payJobRequest)

export default router
