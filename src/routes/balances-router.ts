import { Router } from 'express'

import { profilesController } from '../controllers'

const router = Router()

router.post('/deposit/:userId', profilesController.depositFundsRequest)

export default router
