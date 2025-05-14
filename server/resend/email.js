import { resend } from './config.js'
import { verificationTokenEmailTemplate, welcomeEmailTemplate } from './email.template.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email Address Now",
      html: verificationTokenEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("Error sending verification email");
  }
}

export const sendWelcomeEmail = async (email, firstName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Student Connect",
      html: welcomeEmailTemplate.replace(
        "{firstName}",
        firstName
      ),
    });
  } catch (error) {
    console.log("error sending welcome email", error);
    throw new Error("Error sending welcome email");
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html: `Click <a href="${resetURL}"here<a> to reset your password.`,
    });
  } catch (error) {
    console.log("error sending password reset email", error);
    throw new Error("Error sending password reset email");
  }
}

export const sendResetSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Successfully",
      html: `Your password was reset successfully.`,
    });
  } catch (error) {
    console.log("error sending password reset successful email", error);
    throw new Error("Error sending password reset successful email");
  }
}