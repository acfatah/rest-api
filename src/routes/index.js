import process from 'node:process'
import express from 'express'
import authRoutes from './auth.js'
import status from './status.js'

const router = express.Router()

// @esbuild-begin-strip
async function importTestRoutes() {
  if (['development', 'test'].includes(process.env.NODE_ENV)) {
    const { default: testRoutes } = await import('../../tests/routes.js')

    router.use(testRoutes)
  }
}

importTestRoutes()
// @esbuild-end-strip

router.use(status)
router.use('/api/v1/auth', authRoutes)

export default router
