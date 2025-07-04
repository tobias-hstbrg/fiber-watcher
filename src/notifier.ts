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
    const data = await mg.messages.create(domain, {
      from: `Glasfaser Watcher <postmaster@${domain}>`,
      to: [process.env.MAILGUN_TO || ""],
      subject: subject,
      html: htmlContent,
    });
    console.log("Mail gesendet:", data);
  } catch (error) {
    console.error("Fehler beim Mail senden:", error);
  }
}