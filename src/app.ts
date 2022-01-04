require('dotenv').config()
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB'

const app = express()

const port = config.get('port')

app.listen(port, () => {
  console.log(`app is running in http://localhost:${port}`)
  connectDB() 
})