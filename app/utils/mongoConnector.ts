const mongoose = require('mongoose')
import Env from '@ioc:Adonis/Core/Env'

let connection
export const connectDB = async () => {
  const mongoDbUrl = Env.get('MONGO_URL')
  try {
    console.log(`Connecting to MongoDB URL ${mongoDbUrl}...`)
    connection = await mongoose.connect(mongoDbUrl, { maxPoolSize: 50 })
    console.log(`Connected to MongoDB URL ${mongoDbUrl}`)
    return connection
  } catch (error) {
    //handle connect error

    console.log(`Cant connect to MongoDB URL ${mongoDbUrl} - ERROR : ${error}`)
  }
}

connectDB()