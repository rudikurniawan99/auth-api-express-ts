require('dotenv').config()
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB'
import logger from './utils/logger'
import router from './routes'

const app = express()
app.use(express.json())
app.use(router)

const port = config.get<number>('port')

app.listen(port, () => {
  logger.info(`app run at http://localhost:${port}`)
  connectDB() 
})