import type { Request, Response, NextFunction } from 'express'

import type { ApiError } from '../utils'

/*
 * Middleware for logging the error messages.
 *  Here you can log the error to a database,
 *  a file, or services like Sentry
 */
export const errorLogger = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(`error ${error.statusCode || ''}: ${error.message}`)
  console.error(error)
  return next(error)
}

/**
 * Middleware for sending the error message to the API consumer
 */
export const errorResponder = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * If response headers have already been sent,
   * continue to the default error handler.
   */
  if (res.headersSent) {
    return next(error)
  }

  const errorStatusCode = error.statusCode || 500
  const errorMessage = error.message || 'Internal Server Error'

  res.status(errorStatusCode)

  res.format({
    // If request 'Accept' header contains either
    // 'application/json' or '*/*', or if it isn't set at all.
    'application/json': () => {
      res.json({ message: errorMessage })
    },
    default: () => {
      /**
       * In any other cases, we send plain error text
       */
      res.type('text/plain').send(errorMessage)
    },
  })
}
