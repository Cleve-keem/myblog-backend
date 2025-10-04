import { transporter } from "../config/mailer.config";

interface MailData {
  email: string;
  lastname: string;
}

export default class MailService {
  public static async sendVerificationMail(data: MailData, token: string) {
    const verificationMailTemplate = {
      from: `${process.env.APP_NAME} <${process.env.SMTP_USER}>`,
      to: data.email!,
      subject: "Confirm your account on Hackhim Platform",
      html: `
        <h1 style="margin: 0; padding: 10px 0;">Hello, ${data.lastname} 👋!</h1>
        
        <p>Thanks for signing up with Hackhim Platform! To complete your registration and activate your account, please verify your email by clicking the link below 🔗</p>
        <a href="https://hackhimblog.netlify.app/account/verify/${token}" style="background: #000; color:#fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 10px 0;">Verify account</a>

        <p>if you didn't request this, feel free to ignore the message. But if you're ready to get started, just click the link and you're all set!</p>

        <p>Have fun, and don't hesitate to contact us with your feedback.</p>

        <p>Thanks</p>
        <a href="https://hackhimblog.netlify.app" style="margin: 5px 0">Hackhim Platform</a>`,
    };
    try {
      await transporter.sendMail(verificationMailTemplate);
      console.log("Verification email sent successfully");
    } catch (error: any) {
      console.error("Error sending email:", error);
      if (error.response) {
        console.error("SendGrid error response:", error.response.body);
      }
      return "Error sending email";
    }
  }
}
