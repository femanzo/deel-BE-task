const { Router } = require('express')

const rootRouter = new Router()
rootRouter.use('/contracts', require('./contracts-router'))
rootRouter.use('/jobs', require('./jobs-router'))
rootRouter.use('/balances', require('./balances-router'))
rootRouter.use('/admin', require('./admin-router'))

module.exports = rootRouter
