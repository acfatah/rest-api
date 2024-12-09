import process from 'node:process'
import express from 'express'
import httpStatus from 'http-status'
import {
  authenticateUser,
  generateAccessToken,
  verifyRefreshToken,
} from '../services/auth-service.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const authResult = authenticateUser(username, password)

  if (authResult) {
    const { token, refreshToken } = authResult

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.json({ token })
  }
  else {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' })
  }
})

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies['refresh-token']

  try {
    const { iat, exp, ...payload } = verifyRefreshToken(refreshToken)
    const newToken = generateAccessToken(payload)

    res.json({ token: newToken })
  }
  catch (error) {
    res.status(httpStatus.FORBIDDEN).json({ message: error.message })
  }
})

export default router
