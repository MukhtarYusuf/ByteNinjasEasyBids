const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    dob: { type: Number },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    tokens: { type: Number },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;