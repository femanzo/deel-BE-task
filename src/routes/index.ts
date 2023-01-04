import { Router } from 'express'
import contractsRouter from './contracts-router'
import jobsRouter from './jobs-router'
import balancesRouter from './balances-router'
import adminRouter from './admin-router'
import profilesRouter from './profiles-router'

const router = Router()
  .use('/contracts', contractsRouter)
  .use('/jobs', jobsRouter)
  .use('/profiles', profilesRouter)
  .use('/balances', balancesRouter)
  .use('/admin', adminRouter)

export default router
