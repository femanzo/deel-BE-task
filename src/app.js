const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const { sequelize } = require('./models')
const rootRouter = require('./routes')
const { errorHandler } = require('./middlewares')

const app = express()
const { errorLogger, errorResponder } = errorHandler

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * Keep it safe!
 * @see https://expressjs.com/en/resources/middleware/cors.html
 * @see https://expressjs.com/en/resources/middleware/helmet.html
 */
app.use(cors())
app.use(helmet())

/**
 * Keep it fast!
 * @see https://expressjs.com/en/resources/middleware/compression.html
 */
app.use(compression())

/**
 * @see https://expressjs.com/en/resources/middleware/body-parser.html
 */
app.use(bodyParser.json())

app.use('/', rootRouter)

/**
 * These must be the last middlewares
 * Order matters!
 */
app.use(errorLogger)
app.use(errorResponder)

module.exports = app
