import httpStatus from 'http-status'
import { logger } from '../services/index.js'
import { ApiError } from '../utils/index.js'

export function errorConverter(err, req, res, next) {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
    const message = error.message || httpStatus[statusCode]

    logger.error(err)
    error = new ApiError(statusCode, message, false, err.stack)
  }

  next(error)
}
