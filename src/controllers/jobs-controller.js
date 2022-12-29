const {
  jobServices: { getUserUnpaidJobs, payJob },
} = require('../services')

const getUserUnpaidJobsRequest = async (req, res, next) => {
  const profileId = req.profile.id

  try {
    const jobs = await getUserUnpaidJobs(profileId)
    return res.json(jobs)
  } catch (err) {
    return next(err)
  }
}

const payJobRequest = async (req, res, next) => {
  const profileId = req.profile.id
  const { job_id: jobId } = req.params

  try {
    const paidJob = await payJob(profileId, jobId)
    return res.json(paidJob)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getUserUnpaidJobsRequest,
  payJobRequest,
}
