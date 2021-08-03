import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

import './database'
import uploadConfig from './config/upload'
import AppError from './errors/AppError'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }

    console.error(err)

    return response.status(500).json({
      status: 'error',
      message: 'internal server error',
    })
  },
)

app.listen(3333, () => {
  console.log('ok')
})
