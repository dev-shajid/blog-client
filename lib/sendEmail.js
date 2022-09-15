import nodemailer from "nodemailer"
import mailTemplate from './mailTemplate'

export default async function sendEmail({ userEmail, subject, otp }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTHOR_EMAIL,
                pass: process.env.AUTHOR_PASSWORD,
            },
        });
        const mailOptions = {
            from: `"Shajid's Auth" <${process.env.AUTHOR_EMAIL}>`,
            to: userEmail,
            subject: subject,
            html: mailTemplate(otp),
        };
        await transporter.sendMail(mailOptions);
        console.log("Send Email Successfully");
        return "A mail has been send to user"
    } catch (err) {
        console.log({ errorS: err.message });
        throw err.message
    }
};