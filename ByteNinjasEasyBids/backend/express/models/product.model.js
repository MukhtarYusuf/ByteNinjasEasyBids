const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String },
    description: { type: String },
    sellerId: { type: String },
    startTime: { type: Number },
    duration: { type: Number },
    originalPrice: { type: Number },
    biddingPrice: { type: Number },
    minSellingPrice: { type: Number },
    participantIds: { type: Array },
    winnerId: { type: String },
    shippingStatus: { type: String },
},
{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;