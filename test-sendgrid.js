// Note: We use 'require' because this runs directly via Node in your terminal
const sgMail = require('@sendgrid/mail');

// 🔑 1. MANUALLY PASTE YOUR RAW SECRETS HERE FOR THIS ISOLATED TEST
const RAW_KEY = "SG.your_actual_full_api_key_here"; 
const VERIFIED_FROM = "hello@bmradvisory.co"; 
const TO_EMAIL = "your_personal_email@domain.com"; 

sgMail.setApiKey(RAW_KEY);

const msg = {
  to: TO_EMAIL,
  from: VERIFIED_FROM,
  subject: '⚡ BMR DIAGNOSTIC: ISOLATED SENDGRID VERIFICATION',
  text: 'Connection verified. Your API key and Sender ID are 100% operational.',
  html: '<strong>Connection verified.</strong> Your API key and Sender ID are 100% operational.',
};

console.log("INITIALIZING TRANSACTION...");

sgMail.send(msg)
  .then(() => {
    console.log('---');
    console.log('✅ SUCCESS: SendGrid verified your account and accepted the email message!');
    console.log('Check your SendGrid Activity Feed dashboard or your email inbox.');
  })
  .catch((error) => {
    console.log('---');
    console.log('❌ CRITICAL FAILURE: SendGrid rejected the request.');
    if (error.response) {
      console.error(JSON.stringify(error.response.body, null, 2));
    } else {
      console.error(error.message);
    }
  });
