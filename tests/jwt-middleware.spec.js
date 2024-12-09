import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

describe('jwt-middleware', () => {
  it('should return a 401 status and a JSON response if no authorization header is provided', async () => {
    const res = await request(app).get('/protected')

    expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    expect(res.body).toEqual({
      message: 'Unauthorized',
    })
  })

  it('should return a 401 status and a JSON response if the authorization header is invalid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid')

    expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    expect(res.body).toEqual({
      message: 'Unauthorized',
    })
  })

  it('should return a 200 status and a JSON response if the authorization header is valid', async () => {
    const user = { username: 'admin', password: 'password' }
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: user.username, password: user.password })

    expect(loginResponse.body.token).toBeDefined()
    expect(loginResponse.status).toBe(httpStatus.OK)

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(httpStatus.OK)
    expect(res.body).toEqual({
      message: 'Protected route',
    })
  })

  it('should return a 401 status and a JSON response if the credentials are invalid', async () => {
    const user = { username: 'admin', password: 'wrongpassword' }

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: user.username, password: user.password })

    expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    expect(res.body).toEqual({
      message: 'Invalid credentials',
    })
  })
})

describe('jwt-refresh-token', () => {
  describe('the POST /api/v1/auth/refresh-token', () => {
    const user = { username: 'admin', password: 'password' }
    let token
    let refreshToken
    let newToken

    it('should return a 200 status and a new token', async () => {
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: user.username, password: user.password })

      token = loginResponse.body.token
      refreshToken = loginResponse.headers['set-cookie'][0].split(';')[0].split('=')[1]

      expect(loginResponse.status).toBe(httpStatus.OK)
      expect(token).toBeDefined()
      expect(refreshToken).toBeDefined()

      const refreshTokenResponse = await request(app)
        .post('/api/v1/auth/refresh-token')
        .set('Cookie', `refresh-token=${refreshToken}`)

      newToken = refreshTokenResponse.body.token

      expect(refreshTokenResponse.status).toBe(httpStatus.OK)
      expect(newToken).toBeDefined()
    })

    it('and the new token should be valid', async () => {
      expect(newToken).not.toBe(token)
      expect(() => jwt.verify(newToken, process.env.JWT_SECRET)).not.toThrowError()
    })
  })
})
