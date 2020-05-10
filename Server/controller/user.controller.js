const userSchema = require('../schema/user.schema');
const citySchema = require('../schema/city.schema');
const csv = require('csv-parser');
const fs = require('fs');
const comman = require('../comman/functions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const responceMessage = require('../messages/messages');
const alertMessage = require('../messages/alertMessages');
const env = require('dotenv').config()

const userController = {
    userList: (req, res) => {
        userSchema.find({}, function (err, userList) {
            err ? res.send(err) : res.send(responceMessage.getResponce(200, true, alertMessage.ALL_USER_LIST, userList));
        }).populate({
            path: 'city',
            model: 'City'
        }).sort('-city')
        //.where('firstName').equals('Bhushan')
    },

    addUser: (req, res) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                req.body.password = hash;
                req.body.salt = salt;
                userSchema.create(req.body, function (err, result) {
                    if (err) {
                        res.send(responceMessage.getResponce(400, false, err))
                    } else {
                        res.send(responceMessage.getResponce(200, true, alertMessage.ADD_USER, result));
                        let subject = 'Verify User';
                        let body = "Hello " + req.body.firstName + " " + req.body.lastName + "Please click here to verify";
                        comman.sendEmail(req.body.emailId, subject, body);
                    }
                });
            });
        });

    },
    login: (req, res) => {
        let emailId = req.body.emailId;
        let password = req.body.password;

        // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        //     // result == true
        // });
        userSchema.findOne({
            emailId: emailId
        }, function (err, userDetails) {
            if (err) {
                res.send(err);
            } else {
                if (userDetails) {
                    let hash = userDetails.password;
                    bcrypt.compare(password, hash, function (err, isMatched) {
                        if (err) {
                            res.send(responceMessage.getResponce(404, false, alertMessage.LOGIN_FAIELD));
                        } else {
                            if (isMatched) {
                                const token = jwt.sign({
                                    data: userDetails,
                                }, 'MYAPP', { expiresIn: '24h' });
                                userDetails.token = token;
                                res.send(responceMessage.getResponce(200, true, alertMessage.LOGIN_SUCCESS, userDetails));
                            } else {
                                res.send(responceMessage.getResponce(400, false, alertMessage.LOGIN_FAIELD));
                            }
                        }
                    });
                } else {
                    res.send(responceMessage.getResponce(400, false, alertMessage.LOGIN_FAIELD));
                }
            }
        });
    },
    updateUser: (req, res) => {
        let userId = req.body.userId;
        let userData = req.body.userData;
        userSchema.findOneAndUpdate({
            _id: userId,
        }, userData, { new: true }, function (err, result) {
            err ? res.send(responceMessage.getResponce(400, false, err)) : res.send(responceMessage.getResponce(200, true, alertMessage.UPDATE_USER, result))
        });
    },
    addUserBuCSV(req, res) {
        fs.createReadStream('./usercsv.csv')
            .pipe(csv())
            .on('data', (row) => {
                citySchema.findOne({ name: row.city }, function (err, result) {
                    if (err) {
                        res.send('Error while fethching city...');
                    } else {
                        row.city = result._id;
                        userSchema.create(row); //insert data into user collection
                    }
                });
            })
            .on('end', (err, result) => {
                err ? res.send({ message: "Error" }) : res.send({ message: "CSV file successfully processed" });
            });
    },
    sendEmail(req, res) {
        let toEmail = req.body.toEmail;
        let subject = req.body.subject;
        let body = req.body.body;
        let password = req.body.password;

        const result = comman.sendEmail(toEmail, subject, body, password);
        if (result) {
            res.send({
                message: "Email sending failed....."
            })
        } else {
            res.send({
                message: "Email send successfully...."
            })
        }
    },
    sendSMS(req, res) {
        let message = req.body.message;
        let mobileNo = req.body.mobileNo;
        const result = comman.sendSMS(mobileNo, message);
        console.log('result', result);


        if (result) {
            res.send({
                message: "SMS send successfully..."
            })
        } else {
            res.send({
                message: "SMS sending failed....."
            })
        }
    }
}
module.exports = userController;