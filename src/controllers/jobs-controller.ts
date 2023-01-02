import type { Request, Response, NextFunction } from 'express'

import { jobServices } from '../services'

const { getUserUnpaidJobs, payJob } = jobServices

export const getUserUnpaidJobsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { id: profileId } = req.profile

  try {
    const jobs = await getUserUnpaidJobs(Number(profileId))
    return res.json(jobs)
  } catch (err) {
    return next(err)
  }
}

export const payJobRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { id: profileId } = req.profile
  const { job_id: jobId } = req.params

  try {
    const paidJob = await payJob(profileId, Number(jobId))
    return res.json(paidJob)
  } catch (err) {
    return next(err)
  }
}
