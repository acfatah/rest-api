import process from 'node:process'
import express from 'express'

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
    res.status(200).json(healthCheck)
  }
  catch (error) {
    healthCheck.status = 'unhealthy'
    healthCheck.error = error.message
    res.status(503).json(healthCheck)
  }
})

export default router
