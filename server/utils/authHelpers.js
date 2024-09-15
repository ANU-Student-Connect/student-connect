const User = require('../models/User');
const nodemailer = require('nodemailer');

// this function checks whether an email already exists in the database
async function checkEmailExists(email) {
    const user = await User.findOne({ email });
    return !!user;
}

// this function validates the ANU email domain
function isANUEmail(email) {
    const regex = /^u\d{7}@anu.edu.au$|^[a-zA-Z]+\.[a-zA-Z]+\d*@anu.edu.au$/;
    return regex.test(email);
}

// this functions sends a verification email
async function sendVerificationEmail(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: 'support@studentconnect.com',  // this should be changed to the correct email address
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'ANU Student Connect - Email Verification',
        text: `Your verification code is: ${verificationCode}`
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    checkEmailExists,
    isANUEmail,
    sendVerificationEmail
};
