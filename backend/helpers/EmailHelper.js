const nodemailer = require('nodemailer');

const send = async (subject, message, to, from, replyTo) => {
    if (!to.includes("@local.host")) {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const options = {
            from,
            to,
            replyTo,
            subject,
            html: message
        };
        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } else {
        console.log(`
        Prevented message for ${to}
        because it is only for test
        `);
    }
};

module.exports = {
    send,
};