import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

let server

beforeAll(() => {
  const PORT = process.env.PORT || 3001

  server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`)
  })
})

afterAll(() => {
  server.close()
})

describe('server', () => {
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
})
