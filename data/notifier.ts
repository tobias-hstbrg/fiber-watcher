import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendMail(subject: string, html: string) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.MAILGUN_FROM!,
      to: [process.env.MAILGUN_TO!],
      subject,
      html,
    });

    console.log("📧 Mail sent!");
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
}
