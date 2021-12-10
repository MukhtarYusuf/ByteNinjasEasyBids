const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
}, {
    timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;