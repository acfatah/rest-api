import process from 'node:process'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET

export function authenticateUser(username, password) {
  // TODO: Implement user authentication logic
  if (username === 'admin' && password === 'password') {
    const payload = { username, iat: Date.now() }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' })

    return { token, refreshToken }
  }

  return null
}

export async function verifyRefreshToken(refreshToken) {
  return await jwt.verify(refreshToken, refreshTokenSecret)
}

export function generateAccessToken(payload) {
  const { iat, exp, ...rest } = payload

  return jwt.sign({ ...rest, iat: Date.now() }, secret, { expiresIn: '1h' })
}
