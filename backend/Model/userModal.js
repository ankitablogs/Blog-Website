const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    dob: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    bio: {
        type : String,
        required : true
    },
    insta: {
        type : String,
        required : true
    },
    linkedin: {
        type : String,
        required : true
    },
    facebook: {
        type : String,
        required : true
    },
    twitter: {
        type : String,
        required : true
    },
    img: {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Userblog', userSchema);