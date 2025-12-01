const express = require('express')
const dbConnect = require('./config/database')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')

require('dotenv').config()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

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

   require("./utils/cronjob")
    app.listen(process.env.PORT, () => {
      console.log('Server is successfully listening on port 7777...')
    })
  })
  .catch((err) => {
    console.log('Connection not done',err)
  })
