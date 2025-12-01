const mongoose = require('mongoose')

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_KEY)
}

module.exports = dbConnect
