const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    heading : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    likeCount: {
        type : Number,
        default : 0
    },
    viewCount: {
        type : Number,
        default : 0
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);