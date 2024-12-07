import express from 'express'
import { jwtMiddleware } from '../src/middlewares/jwt-middleware.js'

export const routes = express.Router()

routes.get('/protected', jwtMiddleware, (req, res) => {
  res.json({ message: 'Protected route' })
})

export default routes
