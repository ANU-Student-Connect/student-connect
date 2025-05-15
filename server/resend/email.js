import { resend } from './config.js'
import { verificationTokenEmailTemplate, welcomeEmailTemplate } from './email.template.js';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // inject the token into your HTML template
    const html = verificationTokenEmailTemplate.replace(
      "{verificationToken}",
      verificationToken
    );

    // send mail
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,                             
      subject: "Verify Your Email Address Now",
      html,                                  
    });
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("Error sending verification email");
  }
}

export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const html = welcomeEmailTemplate.replace("{firstName}", firstName);

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Welcome to Student Connect",
      html,
    });

    console.log("Welcome email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("error sending welcome email", error);
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = `Click <a href="${resetURL}">here</a> to reset your password.`;

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html,
    });

    console.log("Password reset email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("error sending password reset email", error);
    throw new Error("Error sending password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const html = `Your password was reset successfully.`;

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Password Reset Successfully",
      html,
    });

    console.log("Password reset success email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("error sending password reset successful email", error);
    throw new Error("Error sending password reset successful email");
  }
};