import process from 'node:process'
import dotenv from 'dotenv'
import { expressjwt } from 'express-jwt'

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
    return res.status(401).json({ message: 'Token expired' })
  },
})

export function jwtErrorHandler(error, req, res, next) {
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
