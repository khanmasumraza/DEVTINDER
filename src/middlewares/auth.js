const jwt = require('jsonwebtoken') // lib to create json web token
const User = require('../models/user')

const userAuth = async (req, res, next) => {
  // Read the token from the req cookies
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).send('Please Login')
    }

    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET)

    const { _id } = decodeObj

    const user = await User.findById(_id)
    if (!user) {
      throw new Error('User not found')
    }
    req.user = user
    next()
  } catch (err) {
    res.status(404).send('ERROR: ' + err.message)
  }
}
module.exports = {
  userAuth,
}
