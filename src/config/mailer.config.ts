// import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SENDGRID_API_KEY) {
  throw new Error(
    "SENDGRID_API_KEY is not defined in the environment variables"
  );
}

if (!process.env.SENDER_EMAIL) {
  throw new Error("SENDER_EMAIL is not defined in the environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const mailer = sgMail;
