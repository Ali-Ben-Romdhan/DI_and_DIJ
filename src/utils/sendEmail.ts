import nodemailer from 'nodemailer';

export function sendEmail(options: { to: string; subject: string; body: string }): void {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emailsender@gmail.com',
            pass: 'password sender',
        },
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
