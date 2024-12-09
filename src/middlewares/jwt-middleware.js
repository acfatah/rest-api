import process from 'node:process'
import dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'
import httpStatus from 'http-status'

dotenv.config()

if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined')
  process.exit(1)
}

if (!process.env.JWT_REFRESH_SECRET) {
  console.error('Error: JWT_REFRESH_SECRET is not defined')
  process.exit(1)
}

const secret = process.env.JWT_SECRET

export const jwtMiddleware = expressjwt({
  secret,
  algorithms: ['HS256'],
  onExpired: async (req, err, res) => {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token expired' })
  },
})

export function jwtErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  next(err)
}
