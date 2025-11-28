const { SendEmailCommand } = require('@aws-sdk/client-ses')
const { sesClient } = require('./sesClient.js')

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Subject: { Charset: 'UTF-8', Data: subject },
      Body: {
        Html: { Charset: 'UTF-8', Data: body },
      },
    },
    Source: fromAddress,
  })
}

const run = async (subject, body, toEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    toEmailId, 
    'masumdev123@gmail.com',
    subject,
    body
  )

  try {
    const result = await sesClient.send(sendEmailCommand)
    console.log('✅ Email Sent:', result.MessageId)
    return result
  } catch (error) {
    console.error('❌ EMAIL ERROR:', error)
    return error
  }
}

module.exports = { run }
