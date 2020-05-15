const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const responceMessage = require('../messages/messages');
const alertMessages = require('../messages/alertMessages')

require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);

const comman = {
    sendEmail: (toEmail, subject, body, password=null) => {
        const transporter = nodemailer.createTransport({
            servicee: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD
            } //https://myaccount.google.com/lesssecureapps?pli=1  keep on Less secure app access
        });

        const mailOptions = {
            from: 'bhushanjire@gmail.com',
            to: toEmail,
            subject: subject,
            //  text: body //for text email
            html: body //for html email
        };

        const result = transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('not send',error);
                
                return error;
            } else {
                console.log('send');

                return info;
            }
        });

        if (result)
            return true;
        else
            return false;

    },
    sendSMS: (mobileNo, body) => {
        console.log(mobileNo, body);
        const result = client.messages
            .create({
                body: body,
                from: '9763075620',
                to: mobileNo
            }).then(message => {
                console.log('Message send', message.sid)
                if (message.sid)
                    return true;
                else
                    return false;
            });

    },
    verifyToken: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            const options = { expiresIn: '24h', issuer: 'bhushan' };
            try {
                jwt.verify(token, 'MYAPP', (error, result) => {
                    if (error) {
                        return res.send(responceMessage.getResponce(404, false, error));
                    } else if (result) {
                        next()
                    } else {
                        res.send(responceMessage.getResponce(404, false, alertMessages.TOKEN_EXPIRED));
                    }
                });
            } catch (error) {
                throw new Error(error);

            }
        }
        else {
            return res.send(responceMessage.getResponce(404, false, alertMessages.AUTHENTICATION_FAILED));
        }

    }
}
module.exports = comman;
