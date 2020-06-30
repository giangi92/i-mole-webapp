const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    surname: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    sessionToken: String, 
    resetPasswordToken: String,
    resetPasswordExpires: Number, 
    accountConfirmationToken: String,
    accountConfirmationExpires: Number, 
    confirmed: Boolean 
}, {        
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;