const { Router } = require('express')
const { jobsController } = require('../controllers')
const { getProfile } = require('../middlewares')

const router = Router()

router.get('/', getProfile, jobsController)

module.exports = router
