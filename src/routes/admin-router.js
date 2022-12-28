const { Router } = require('express')
const { adminController } = require('../controllers')

const router = Router()

router.post('/best-clients', adminController.getBestClients)
router.post('/best-profession', adminController.getBestProfession)

module.exports = router
