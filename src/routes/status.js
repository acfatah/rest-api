import process from 'node:process'
import express from 'express'
import httpStatus from 'http-status'

const router = express.Router()

// Health Check Endpoint
router.get('/status', (req, res) => {
  const healthCheck = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
  try {
    // Add any additional checks (e.g., database connection)
    res.status(httpStatus.OK).json(healthCheck)
  }
  catch (error) {
    healthCheck.status = 'unhealthy'
    healthCheck.error = error.message
    res.status(httpStatus.SERVICE_UNAVAILABLE).json(healthCheck)
  }
})

export default router
