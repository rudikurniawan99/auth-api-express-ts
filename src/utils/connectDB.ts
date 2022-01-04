import mongoose from 'mongoose'
import config from 'config'

const dbUri = config.get<string>('dbUri')

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri) 
    console.log('success to connect to db') 
  } catch (e) {
    console.error(e) 
  }
}

export default connectDB