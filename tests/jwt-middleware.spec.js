import jwt from 'jsonwebtoken'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

describe('jwt-middleware', () => {
  it('should return a 401 status and a JSON response if no authorization header is provided', async () => {
    const res = await request(app).get('/protected')

    expect(res.status).toBe(401)
    expect(res.body).toEqual({
      message: 'Unauthorized',
    })
  })

  it('should return a 401 status and a JSON response if the authorization header is invalid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid')

    expect(res.status).toBe(401)
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
    expect(loginResponse.status).toBe(200)

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Protected route',
    })
  })

  it('should return a 401 status and a JSON response if the credentials are invalid', async () => {
    const user = { username: 'admin', password: 'wrongpassword' }

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: user.username, password: user.password })

    expect(res.status).toBe(401)
    expect(res.body).toEqual({
      message: 'Invalid credentials',
    })
  })

  // TODO: test refresh token
})
