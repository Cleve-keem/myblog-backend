import { transporter } from "../config/mailer.config";

export default class MailService {
  public static async sendVerificationMail(
    data: Record<string, string>,
    token: string
  ) {
    const verificationMailTemplate: Record<string, string> = {
      from: `${process.env.APP_NAME} <${process.env.SMTP_USER}>`,
      to: data.email!,
      subject: "Account verification",
      html: `
        <h1>Hello, ${data.lastname} 👋!</h1>
        <p>To complete your registration and activate your account, please verify your email by clicking the link below 🔗</p>
        <a href="https://hackhimblog.netlify.app/account/verify/${token}">link</a>

        <p>if you didn't request this, feel free to ignore the message. But if you're ready to get started, just click the link and you're all set!</p>

        <p>Thanks</p>
        <p>Hackhim Platform</p>`,
    };
    try {
      await transporter.sendMail(verificationMailTemplate);
    } catch (error) {
      console.error("Error sending email:", error);
      return "Error sending email";
    }
  }
}
