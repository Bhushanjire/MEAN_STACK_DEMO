const router = require('express').Router();
const userController = require('../controller/user.controller');
const cityController = require('../controller/city.controller');
const festivalController =require('../controller/festival.controller');
const collegeController = require('../controller/college.controller');
const token = require('../comman/functions');


//User Routes
router.get('/list-user', token.verifyToken,userController.userList);
router.post('/add-user',userController.addUser);
router.post('/add-user-csv',userController.addUserBuCSV);
router.post('/send-email',userController.sendEmail);
router.post('/send-sms',userController.sendSMS);
router.post('/login',userController.login);
router.put('/update-user', token.verifyToken,userController.updateUser);



//City Routes
router.post('/add-city',cityController.addCity);
router.get('/list-city',cityController.listCity);

//Festival Routes
router.post('/add-festival',festivalController.addFestival);
router.post('/list-festival',festivalController.festivalList);


//College Route
router.post('/add-college',collegeController.addCollege);
router.get('/list-college',collegeController.collegeList);


module.exports = router;