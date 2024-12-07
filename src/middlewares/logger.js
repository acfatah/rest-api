import process from 'node:process'
import express from 'express'
import morgan from 'morgan'

export const logger = express.Router()
const format = process.env.NODE_ENV === 'development' ? 'dev' : 'combined'

logger.use(morgan(format))
