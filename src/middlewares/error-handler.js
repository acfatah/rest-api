import httpStatus from 'http-status'

export function errorHandler(error, req, res, _next) {
  const { statusCode, message } = error
  const response = { code: statusCode, message }

  res.status(statusCode ?? httpStatus.INTERNAL_SERVER_ERROR).send(response)
}
