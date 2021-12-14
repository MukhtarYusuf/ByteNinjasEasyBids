const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    payerId: { type: String },
    payeeId: { type: String },
    description: { type: String },
    amount: { type: Number },
    date: { type: Number },
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;