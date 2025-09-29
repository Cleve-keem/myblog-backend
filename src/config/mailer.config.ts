import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV !== "production",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Nodemailer transporter verification error:", error);
  } else {
    console.log("Nodemailer transporter is ready to take messages", success);
  }
});
