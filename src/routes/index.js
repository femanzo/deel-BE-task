const { Router } = require('express')

const contractsRouter = require('./contracts-router')
const jobsRouter = require('./jobs')
// const balancesRouter = require('./balances')
// const adminRouter = require('./admin')

const rootRouter = new Router()
rootRouter.use('/contracts', contractsRouter)
rootRouter.use('/jobs', jobsRouter)
// rootRouter.use('/balances', balancesRouter)
// rootRouter.use('/admin', adminRouter)

module.exports = rootRouter
