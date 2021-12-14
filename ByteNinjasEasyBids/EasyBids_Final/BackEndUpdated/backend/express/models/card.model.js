const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    nameOnCard: { type: String },
    cardNumber: { type: Number },
    ccv: { type: Number },
    expirationDate: { type: Number },
    ownerId: { type: Number },
    billingAddress1: { type: String },
    billingAddress2: { type: String },
    billingCity: { type: String },
    billingState: { type: String },
    billingCountry: { type: String },
    billingZipCode: { type: String },
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;