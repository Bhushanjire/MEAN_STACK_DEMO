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
const env = require('dotenv').config();
const CryptoJS = require("crypto-js");
const waterfall = require('async-waterfall');

let tokenData = {
    id: null,
    first_name: null,
    last_name: null,
    email: null
}


const userController = {
    userList: (req, res) => {
        let limit = req.body.pageSize;
        let offset = ((req.body.offset - 1) * limit);
        let searchText = req.body.searchText;

        var query = {}
        if (req.body.searchText) {
            query = { $or: [{ firstName: { $regex: req.body.searchText, $options: 'i' } }, { lastName: { $regex: req.body.searchText, $options: 'i' } }, { mobileNo: { $regex: req.body.searchText, $options: 'i' } }, { emailId: { $regex: req.body.searchText, $options: 'i' } }, { 'City.name': { $regex: req.body.searchText, $options: 'i' } }] }
        }


        userSchema.count(query, function (error, total) {
            userSchema.find(query, function (err, userList) {
                err ? res.send(err) : res.send(responceMessage.getResponce(200, true, alertMessage.ALL_USER_LIST, {
                    users: userList,
                    totalRecords: total
                }));
            }).populate({
                path: 'city',
                model: 'City',
                // match: { name: { $regex: searchText }, $options: 'i' }
            }).sort('firstName').skip(offset).limit(limit);
        })
    },
    addUser: (req, res) => {

        // waterfall([
        //     function(callback){
        //       userSchema.findOne({emailId : req.body.emailId},(error,result)=>{
        //         callback(null, 'three');
        //       })
        //     },
        //     function(arg1, arg2, callback){
        //       callback(null, 'three');
        //     // },
        //     function(arg1, callback){
        //       // arg1 now equals 'three'
        //       callback(null, 'done');
        //     }
        //   ], function (err, result) {
        //     // result now equals 'done'
        //   });


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
                                console.log('login user details', userDetails)
                                tokenData = {
                                    id: userDetails._id,
                                    first_name: userDetails.firstName,
                                    last_name: userDetails.lastName,
                                    email: userDetails.emailId
                                }
                                const token = jwt.sign({
                                    data: tokenData,
                                }, 'MYAPP', { expiresIn: '24h' });

                                res.send(responceMessage.getResponce(200, true, alertMessage.LOGIN_SUCCESS, token));
                            } else {
                                res.send(responceMessage.getResponce(400, false, alertMessage.LOGIN_FAIELD));
                            }
                        }
                    });
                } else {
                    res.send(responceMessage.getResponce(400, false, alertMessage.LOGIN_FAIELD));
                }
            }
        }) //'_id firstName lastName mobileNo emailId'
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
    },
    loginWithSocialSite: (req, res) => {
        let userDetails = req.body.userDetails;
        let siteName = req.body.siteName;
        // const [userDetails,siteName] = req.body;

        if(siteName=='facebook'){
            tokenData = {
                id: userDetails.id,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                email: userDetails.email
            }
        }else if(siteName=='google'){
            tokenData = {
                id: userDetails.id,
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                email: userDetails.email
            } 
        }
        const token = jwt.sign({
            data: tokenData,
        }, 'MYAPP', { expiresIn: '24h' });
        res.send(responceMessage.getResponce(200, true, alertMessage.LOGIN_SUCCESS, token));
    },
}
module.exports = userController;