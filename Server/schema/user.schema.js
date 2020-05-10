const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    mobileNo: {
        type: String,
    },
    emailId: {
        type: String,
        unique: true
    },
    city :{
        type : mongoose.Types.ObjectId,
        require : true,
        ref : 'City'
    },
    password : {
        type : String,
        require : true
    },
    token:{
        type:String
    },
    salt : {
        type : String,
        require : true
    }
});
const Users = mongoose.model('Users',userSchema);

module.exports = Users;
