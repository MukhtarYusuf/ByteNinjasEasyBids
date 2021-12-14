var express = require('express');
var router = express.Router();

const UsersHelper = require('../helpers/usersHelper');

/*const userSchema = new Schema({
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
}*/

// GET: Get all Users
router.route('/').get(async (req, res) => {
    try {
        const users = await UsersHelper.getAllUsers();
        res.json(users);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one User
router.route('/:id').get(async (req, res) => {
    try {
        const user = await UsersHelper.getUser(req.params.id);
        res.json(user);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one User by Email
router.route('/email/:email').get(async (req, res) => {
    try {
        const user = await UsersHelper.getUserByEmail(req.params.email);
        res.json(user);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add a User
router.route('/add').post(async (req, res) => {
    try {
        await UsersHelper.addUser(req.body);
        res.json('Successfully Added');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update a User
router.route('/update/:id').put(async (req, res) => {
    try {
        await UsersHelper.updateUser(req.params.id, req.body);
        res.json('Successfully Updated');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete a User
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await UsersHelper.deleteUser(req.params.id);
        res.json('Successfully Deleted');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Purchase Tokens
router.route('/token-purchase').post(async (req, res) => {
    try {
        await UsersHelper.purchaseTokens(req.body.userId, req.body.tokenCount);
        res.json('Successfully Purchased');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Pay for Product
router.route('/pay-for-product').post(async (req, res) => {
    try {
        await UsersHelper.payForProduct(req.body.userId, req.body.productId);
        res.json('Payment Success');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
