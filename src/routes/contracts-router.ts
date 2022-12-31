import { Router } from 'express'

import { contractsController } from '../controllers'
import { getProfile } from '../middlewares'

export default Router()
  .get<{ profile: any }>('/', getProfile, contractsController.getUserNonTerminantedContractsRequest)
  .get('/:id', getProfile, contractsController.getProfileContractByIdRequest)
