const { Router } = require('express')
const { profilesController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = Router()

router.post('/deposit/:userId', authMiddleware, profilesController.depositFundsRequest)

module.exports = router
