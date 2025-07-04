import Mailgun from "mailgun.js";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
  // url: "https://api.eu.mailgun.net" // falls EU-Domain
});

const domain = process.env.MAILGUN_DOMAIN || "";

export async function sendMail(subject: string, htmlContent: string) {
  try {
    // Read MAILGUN_TO, split by comma, and trim spaces
    const recipients = (process.env.MAILGUN_TO || "")
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (recipients.length === 0) {
      console.warn("No recipients specified in MAILGUN_TO");
      return;
    }

    console.log("Sending mail to:", recipients);
    const data = await mg.messages.create(domain, {
      from: `Glasfaser Watcher <postmaster@${domain}>`,
      to: recipients, // array of emails
      subject,
      html: htmlContent,
    });

    console.log("Mail sent:", data);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}