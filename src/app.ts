require('dotenv').config()
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB'
import logger from './utils/logger'

const app = express()

const port = config.get<number>('port')

app.listen(port, () => {
  logger.info(`app run at http:localhost:${port}`)
  connectDB() 
})