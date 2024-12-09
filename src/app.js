import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'

import {
  errorConverter,
  errorHandler,
  jwtErrorHandler,
  logger,
} from './middlewares'
import routes from './routes'
import { ApiError } from './utils'

export const app = express()

app.use(logger)

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// parse cookie
app.use(cookieParser())

app.use(routes)

// JWT authentication
app.use(jwtErrorHandler)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)
