import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

let server

describe('server', () => {
  beforeAll(() => {
    const PORT = process.env.PORT || 3001

    server = app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`)
    })
  })

  afterAll((done) => {
    server.close(done)
  })

  describe('the GET /status', () => {
    it('should return a 200 status and a JSON response', async () => {
      app.get('/status', (req, res) => {
        res.status(200).send()
      })

      const response = await request(app).get('/status')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        status: 'ok',
        uptime: expect.any(Number),
        timestamp: expect.any(String),
      })
    })
  })

  describe('the GET /404', () => {
    it('should return a 404 status and a JSON response', async () => {
      app.get('/404', (req, res) => {
        res.status(404).send()
      })

      const response = await request(app).get('/404')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        code: 404,
        message: 'Not found',
      })
    })
  })
})
