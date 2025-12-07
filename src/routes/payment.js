const express = require('express')
const { userAuth } = require('../middlewares/auth')
const razorpayInstance = require('../utils/razorpay')
const Payment = require('../models/payment')
const User = require('../models/user')
const { membershipAmount } = require('../utils/constants')
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')
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
    const webhookSignature = req.get('X-Razorpay-Signature')

    if (!webhookSignature) {
      return res.status(400).json({ msg: 'Webhook signature is missing' })
    }

    const webhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    )

    if (!webhookValid) {
      return res.status(400).json({ msg: 'webhook Signature is invalid' })
    }

    // Update the payment status in db

    const paymentDetails = req.body.payload.payment.entity

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id })

    if (!payment) {
      return res.status(400).json({ msg: 'Payment not found' })
    }
    payment.status = paymentDetails.status
    await payment.save()

    // Only make user premium if payment is captured
    if (paymentDetails.status === 'captured') {
      const user = await User.findOne({ _id: payment.userId })

      if (!user) {
        console.log('User not found:', payment.userId)
        return res.status(404).json({ msg: 'User not found' })
      }

      user.isPremium = true
      user.membershipType = payment.notes.membershipType
      await user.save()
      console.log('User upgraded to premium:', user.emailId)
    }

    if (paymentDetails.status === 'failed') {
      console.log('Payment failed for order:', paymentDetails.order_id)
    }

    return res.status(200).json({ msg: 'Webhook received successfully' })
  } catch (err) {
    console.log('Webhook error:', err)
    res.status(500).json({ msg: err.message })
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
