const mongoose = require('mongoose');

const User = mongoose.model('User', { name:String, surname:String, email: String, password:String, createdAt:Number, sessionToken:String, resetPasswordToken:String, resetPasswordExpires:Number })

module.exports = User;