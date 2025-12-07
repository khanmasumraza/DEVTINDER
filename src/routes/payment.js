const express = require('express')
const { userAuth } = require('../middlewares/auth')
const razorpayInstance = require('../utils/razorpay')
const Payment = require('../models/payment')
const User = require('../models/user')
const { membershipAmount } = require('../utils/constants')
const {
  validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils')
const { tr } = require('date-fns/locale')

const paymentRouter = express.Router()

paymentRouter.post('/payment/create', userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body
    const { firstname, lastname, emailId } = req.user

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        firstname,
        lastname,
        emailId,
        membershipType: membershipType,
      },
    })
    // Save it in my database
    console.log('Order Created', order)

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    })

    const savedPayment = await payment.save()

    // Return back my order details to frontend

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.log('ERROR:', err)
    res.status(400).json({ msg: err.message })
  }
})

paymentRouter.post('/payment/webhook', async (req, res) => {
  try {
    console.log('Webhook Called')

    const signature = req.get('X-Razorpay-Signature')

    const isValid = validateWebhookSignature(
      req.body, // ❗ raw buffer (NOT JSON.stringify)
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    )

    if (!isValid) {
      console.log('Invalid Webhook Signature')
      return res.status(400).json({ msg: 'Invalid signature' })
    }

    console.log('Valid Webhook Signature')

    const payload = JSON.parse(req.body.toString()) // convert buffer → JSON

    const paymentDetails = payload.payload.payment.entity

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id })

    if (!payment) {
      console.log('Payment not found')
      return res.status(404).json({ msg: 'Payment not found' })
    }

    payment.status = paymentDetails.status
    await payment.save()

    const user = await User.findById(payment.userId)
    user.isPremium = true
    user.membershipType = payment.notes.membershipType
    await user.save()

    console.log('User upgraded to premium')

    return res.status(200).json({ msg: 'Webhook received' })
  } catch (err) {
    console.log('Error:', err)
    return res.status(500).json({ msg: err.message })
  }
})

paymentRouter.get('/premium/verify', userAuth, async (req, res) => {
  const user = req.user.toJSON()
  console.log(user)

  if (user.isPremium) {
    return res.json({ ...user })
  }
  return res.json({ ...user })
})
module.exports = paymentRouter
