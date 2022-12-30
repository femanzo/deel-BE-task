const { Router } = require('express')
const { contractsController } = require('../controllers')
const { getProfile } = require('../middlewares')

const router = Router()

router.get('/', getProfile, contractsController.getUserNonTerminantedContractsRequest)
router.get('/:id', getProfile, contractsController.getProfileContractByIdRequest)

module.exports = router
