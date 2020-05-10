const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default : Date.now()
    }
});

const City = mongoose.model('City',citySchema);

module.exports = City;