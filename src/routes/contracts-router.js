const { Router } = require('express')
const { contractsController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

const router = Router()

router.get('/', authMiddleware, contractsController.getUserNonTerminantedContracts)
router.get('/:id', authMiddleware, contractsController.getUserContractById)

module.exports = router
