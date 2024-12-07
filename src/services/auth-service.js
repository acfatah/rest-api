import process from 'node:process'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET
const refreshTokens = []

export function authenticateUser(username, password) {
  // TODO: Implement user authentication logic
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ username }, refreshTokenSecret, { expiresIn: '7d' })
    refreshTokens.push(refreshToken)

    return { token, refreshToken }
  }

  return null
}

export function verifyRefreshToken(refreshToken) {
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    throw new Error('Refresh token not found or invalid')
  }

  return jwt.verify(refreshToken, refreshTokenSecret)
}

export function generateAccessToken(username) {
  return jwt.sign({ username }, secret, { expiresIn: '1h' })
}
