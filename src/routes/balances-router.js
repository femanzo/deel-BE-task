const { Router } = require('express')
const { balancesController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = Router()

router.post('/deposit/:userId', authMiddleware, balancesController.depositFunds)

module.exports = router
