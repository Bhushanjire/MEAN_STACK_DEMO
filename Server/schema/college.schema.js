const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: mongoose.Types.ObjectId,
        require : true,
        ref: 'City',
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    tags: [{
        type: String
    }],
    festivals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Festival'
    }],
    referalCode: {
        type: String
    },
    referalDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const College = mongoose.model('College', collegeSchema)
module.exports = College;
