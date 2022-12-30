const { Router } = require('express')

const { adminController } = require('../controllers')
const { validateQuery } = require('../utils')

const router = Router()

router.get('/best-clients', validateQuery(['start', 'end']), adminController.getBestClientsRequest)
router.get(
  '/best-profession',
  validateQuery(['start', 'end']),
  adminController.getBestProfessionRequest
)

module.exports = router
