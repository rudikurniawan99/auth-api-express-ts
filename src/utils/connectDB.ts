import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const dbUri = config.get<string>('dbUri')

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri) 
    logger.info('success connect to DB')
  } catch (e) {
    logger.error(e)
  }
}

export default connectDB