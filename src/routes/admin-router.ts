import { Router } from 'express'

import { adminController } from '../controllers'
import { validateQuery } from '../middlewares'

const router = Router()

router.get('/best-clients', validateQuery(['start', 'end']), adminController.getBestClientsRequest)
router.get(
  '/best-profession',
  validateQuery(['start', 'end']),
  adminController.getBestProfessionRequest
)

export default router
