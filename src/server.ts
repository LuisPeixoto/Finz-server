import 'reflect-metadata'

import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'

import './database'
import uploadConfig from './config/upload'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.listen(3333, () => {
  console.log('ok')
})
