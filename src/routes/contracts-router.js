const { Router } = require('express')
const { contractsController } = require('../controllers')
const { getProfile } = require('../middlewares')

const router = Router()

router.get('/', getProfile, contractsController.getUserNonTerminantedContracts)
router.get('/:id', getProfile, contractsController.getUserContractById)

module.exports = router
