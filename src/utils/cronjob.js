const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

const VERIFIED_EMAILS = ['khanmasum37010@gmail.com', 'masumdev123@gmail.com'];


cron.schedule("0 8 * * *", async () => {
  
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    
    const pendingRequests = await ConnectionRequestModel.find({
      status: "intrested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    
    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    const verifiedEmailsToSend = listOfEmails.filter(email => 
      VERIFIED_EMAILS.includes(email)
    );
    
    for (const email of verifiedEmailsToSend) {
      try {
        await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are so many friend requests pending, please login to DevTinder.in and accept or reject the requests.",
          email
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});