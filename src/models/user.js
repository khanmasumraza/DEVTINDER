const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxLength: 15,
      lowercase: true,
    },
    lastname: {
      type: String,
      maxLength: 10,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is Invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Password is not strong')
        }
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: `{VALUE} is not a gender type`,
      },
    },
    photoUrl: {
      type: String,
      default:
        'https://imgs.search.brave.com/awksT_Zoh8G9Qn5d-CbZP4gAPcl0EDxLP0J88fgAnB4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0',
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error('URL is Invalid')
        }
      },
    },
    about: {
      type: String,
      minLength: 10,
      // If the user is not entering about data it will add default value
      default: 'This is the default value of the user',
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
      min: 18,
    },
    phoneNumber: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, 'en-IN')) {
          throw new Error('Phone Number is invalid')
        }
      },
    },
  },
  {
    timestamps: true,
  }
)

// User.find({firstname:"khan",lastname:"masum"}) // adding index
userSchema.index({ firstname: 1, lastname: 1 })
userSchema.index({ gender: 1 })

userSchema.methods.getJWT = async function () {
  const user = this
  const token = await jwt.sign({ _id: user._id }, 'KHAN@12', {
    expiresIn: '1d',
  })

  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this
  const passwordHash = user.password

  const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash)

  return isPasswordValid
}
const userModel = mongoose.model('User', userSchema)

module.exports = userModel
