var express = require('express');
var router = express.Router();

const TransactionsHelper = require('../helpers/transactionsHelper');

/*
const transactionSchema = new Schema({
    payerId: { type: String },
    payeeId: { type: String },
    description: { type: String },
    amount: { type: Number },
    date: { type: Number },
}
*/

// GET: Get all Transactions
router.route('/').get(async (req, res) => {
    try {
        const transactions = await TransactionsHelper.getAllTransactions();
        res.json(transactions);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one Transaction
router.route('/:id').get(async (req, res) => {
    try {
        const transaction = await TransactionsHelper.getTransaction(req.params.id);
        res.json(transaction);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add a Transaction
router.route('/add').post(async (req, res) => {
    try {
        await TransactionsHelper.addTransaction(req.body);
        res.json('Successfully Added');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update a Transaction
router.route('/update/:id').put(async (req, res) => {
    try {
        await TransactionsHelper.updateTransaction(req.params.id, req.body);
        res.json('Successfully Updated');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete a Transaction
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await TransactionsHelper.deleteTransaction(req.params.id);
        res.json('Successfully Deleted');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;