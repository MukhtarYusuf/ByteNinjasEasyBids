const Transaction = require('../models/transaction.model');

// Get all Transactions
async function getAllTransactions() {
    const transactions = await Transaction.find().exec();
    return transactions;
}

// Get one Transaction
async function getTransaction(transactionId) {
    const transaction = await Transaction.findById(transactionId).exec();
    return transaction;
}

// Add a Transaction
async function addTransaction(transaction) {
    const payerId = transaction.payerId;
    const payeeId = transaction.payeeId;
    const description = transaction.description;
    const amount = transaction.amount;
    const date = transaction.date;

    const newTransaction = new Transaction({
        payerId,
        payeeId,
        description,
        amount,
        date,
    });

    await newTransaction.save();
}

// Update a Transaction
async function updateTransaction(transactionId, transaction) {
    const transactionToUpdate = await Transaction.findById(transactionId).exec();

    transactionToUpdate.payerId = transaction.payerId;
    transactionToUpdate.payeeId = transaction.payeeId;
    transactionToUpdate.description = transaction.description;
    transactionToUpdate.amount = transaction.amount;
    transactionToUpdate.date = transaction.date;

    await transactionToUpdate.save();
}

// Delete a Transaction
async function deleteTransaction(transactionId) {
    await Transaction.findByIdAndDelete(transactionId).exec();
}

module.exports.getAllTransactions = getAllTransactions;
module.exports.getTransaction = getTransaction;
module.exports.addTransaction = addTransaction;
module.exports.updateTransaction = updateTransaction;
module.exports.deleteTransaction = deleteTransaction;