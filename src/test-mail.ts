import dotenv from 'dotenv';
dotenv.config();

import { sendMail } from './notifier';

async function main() {
    await sendMail("Mailgun Test", "<p>This is a test to check if Mailgun can send an email with success.</p>")
    .then(() => console.log("Mail gesendet"))
    .catch((err) => console.log("Fehler beim Senden der Mail:", err));
}

main();