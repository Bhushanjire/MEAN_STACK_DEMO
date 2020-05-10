const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
    name :{
        type : String,
        require : true
    },
    startDate : {
        type : Date,
        require : true
    },
    endDate : {
        type  : Date,
        require : true
    },
    highlights : {
        type :Array
    },
    college : {
        type : mongoose.Types.ObjectId,
        require : true,
        ref : "College"
    }
});

Festival = mongoose.model('Festival',festivalSchema);

module.exports = Festival;