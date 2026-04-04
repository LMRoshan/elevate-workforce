const mongoose = require('mongoose')

class Database {
  constructor() {
    this.connection = null
  }

  async connect() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      this.connection = conn
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Database Connection Error: ${error.message}`)
      process.exit(1)
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

module.exports = Database.getInstance()