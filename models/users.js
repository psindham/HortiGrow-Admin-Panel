const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    UserFullname:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Password:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Zipcode:{
        type:Number,
        required:true
    }
})

UserSchema.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

module.exports= mongoose.model('user',UserSchema);