const { Router } = require('express')
const { profilesController } = require('../controllers')

const router = Router()

router.post('/deposit/:userId', profilesController.depositFundsRequest)

module.exports = router
