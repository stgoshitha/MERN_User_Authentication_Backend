const mongoose = require('mongoose');

const userSechema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    role:{
        type: String,
        enum: ['jobSeeker', 'employer', 'admin'],
        default: 'jobSeeker'
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

const userModel = mongoose.model('user', userSechema)

module.exports = userModel; 