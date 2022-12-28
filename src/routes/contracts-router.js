const { Router } = require('express')
const { contractsController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = Router()

router.get('/', authMiddleware, contractsController.getUserNonTerminantedContractsRequest)
router.get('/:id', authMiddleware, contractsController.getUserContractByIdRequest)

module.exports = router
