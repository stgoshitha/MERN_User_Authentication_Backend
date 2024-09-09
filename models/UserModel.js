const mongoose = require('mongoose');

const userSechema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
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
        
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

const userModel = mongoose.model('user', userSechema)

module.exports = userModel; 