const nodemailer = require("nodemailer");
const { USER, PASS, SERVICE, HOST } = require("../config/environments");

const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: HOST,
            service: SERVICE,
            port: 587,
            secure: false,
            auth: {
                user: USER,
                pass: PASS,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: subject,
            html: html,
        });

        console.log("email send successfully");
    } catch (error) {
        console.log(error, "email not send");
    }
};

module.exports = sendEmail;
