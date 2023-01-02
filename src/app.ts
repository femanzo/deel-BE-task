import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import rootRouter from './routes'
import { errorHandler } from './middlewares'

const app = express()
const { errorLogger, errorResponder } = errorHandler

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

export default app
