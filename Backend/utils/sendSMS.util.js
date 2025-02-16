const twilio = require("twilio");

// Twilio credentials (replace with your actual credentials)
const accountSid = process.env.TWILIO_SID; // Replace with your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Replace with your Twilio phone number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

/**
 * Send OTP via SMS using Twilio
 * @param {string} phoneNumber - The recipient's phone number
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} - Returns true if the SMS was sent successfully, otherwise false
 */
async function sendOTPViaSMS(phoneNumber, message) {
  try {
    const smsResponse = await client.messages.create({
      body: message, // SMS content
      from: twilioPhoneNumber, // Twilio phone number
      to: phoneNumber, // Recipient's phone number
    });

    console.log("SMS sent successfully. Message SID:", smsResponse.sid);
    return true; // SMS sent successfully
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false; // Failed to send SMS
  }
}

module.exports = { sendOTPViaSMS };