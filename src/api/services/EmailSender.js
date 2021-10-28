import NodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const MAIL_FROM_ADDRESS = process.env.SENDER_EMAIL_ID;
const MAIL_FROM_PASSWORD = process.env.SENDER_PASSWORD;

class EmailSender {
  transport;
  constructor() {
    this.transport = NodeMailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_FROM_ADDRESS, pass: MAIL_FROM_PASSWORD },
    });
  }

  async sendMessage(email, otp) {
    const subject = "Sending Email for account verification otp ";
    const html = "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"

     const mailOptions = {
      from: MAIL_FROM_ADDRESS,
      to: email,
      subject: subject,
      html: html,
    };
    await this.transport.sendMail(mailOptions);
  }
}

export default new EmailSender();
