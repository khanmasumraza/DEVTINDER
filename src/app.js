const express = require('express')
const dbConnect = require('./config/database')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

dbConnect()
  .then(() => {
    console.log('Database Connection done')
    app.listen(7777, () => {
      console.log('Server is successfully listening on port 7777...')
    })
  })
  .catch((err) => {
    console.log('Connection not done')
  })
