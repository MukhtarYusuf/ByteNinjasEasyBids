const User = require('../models/user.model');
const AdminsHelper = require('../helpers/adminsHelper');
const TransactionsHelper = require('../helpers/transactionsHelper');
const ProductsHelper = require('../helpers/productsHelper');

// Get all Users
async function getAllUsers() {
    const users = await User.find().exec();
    return users;
}

// Get one User
async function getUser(userId) {
    const user = await User.findById(userId).exec();
    return user;
}

// Get one User by Email
async function getUserByEmail(userEmail) {
    const userArray = await User.where('email').equals(userEmail).exec();
    const user = (userArray.length === 0) ? null : userArray[0];
    
    return user;
}

// Add a User
async function addUser(user) {
    const email = user.email;
    const username = user.username;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const dob = user.dob;
    const addressLine1 = user.addressLine1;
    const addressLine2 = user.addressLine2;
    const city = user.city;
    const state = user.state;
    const country = user.country;
    const zipCode = user.zipCode;
    const tokens = 20;

    const newUser = new User({
        email,
        username,
        firstName,
        lastName,
        dob,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode,
        tokens,
    });

    await newUser.save();
}

// Update a User
async function updateUser(userId, user) {
    const userToUpdate = await User.findById(userId).exec();

    userToUpdate.email = user.email;
    userToUpdate.username = user.username;
    userToUpdate.firstName = user.firstName;
    userToUpdate.lastName = user.lastName;
    userToUpdate.dob = Number(user.dob);
    userToUpdate.addressLine1 = user.addressLine1;
    userToUpdate.addressLine2 = user.addressLine2;
    userToUpdate.city = user.city;
    userToUpdate.state = user.state;
    userToUpdate.country = user.country;
    userToUpdate.zipCode = user.zipCode;
    userToUpdate.tokens = Number(user.tokens);

    await userToUpdate.save();
}

// Delete a User
async function deleteUser(userId) {
    await User.findByIdAndDelete(userId).exec();
}

// Purchase Tokens
async function purchaseTokens(userId, tokenCount) {
    const user = await User.findById(userId).exec();
    const admin = await AdminsHelper.getAdminByEmail('admin@easybids.com');
    
    let amount = tokenCount * 0.5;
    amount = Number(Math.round(amount+'e2')+'e-2'); // Round to 2 decimal places

    const description = `Tokens Purchase: ${tokenCount} tokens`;
    const date = new Date().valueOf();

    let transaction = {};
    transaction['payerId'] = userId;
    transaction['payeeId'] = admin._id;
    transaction['description'] = description;
    transaction['amount'] = amount;
    transaction['date'] = date;

    await TransactionsHelper.addTransaction(transaction);

    user.tokens += Number(tokenCount);
    await user.save();
}

// Pay for product
async function payForProduct(userId, productId) {
    const product = await ProductsHelper.getProduct(productId);
    const admin = await AdminsHelper.getAdminByEmail('admin@easybids.com');

    let profit = 0;
    let sellerAmount = 0;
    let adminAmount = 0;

    // Tokens worth spent on product
    let tokensWorthSpent = (product.biddingPrice / 0.01) * 0.5;
    tokensWorthSpent = Number(Math.round(tokensWorthSpent+'e2')+'e-2'); // Round to 2 decimal places

    // Calculate payout
    const minSellingPrice = product.minSellingPrice;
    profit = tokensWorthSpent - minSellingPrice;

    if (profit > 0) {
        sellerAmount = minSellingPrice + (0.5 * profit);
        sellerAmount = Number(Math.round(sellerAmount+'e2')+'e-2'); // Round to 2 decimal places
    } else {
        sellerAmount = minSellingPrice;
        sellerAmount = Number(Math.round(sellerAmount+'e2')+'e-2'); // Round to 2 decimal places
    }

    const description = `Seller Payout: ${product.name}`;
    const date = new Date().valueOf();

    let transaction = {};
    transaction['payerId'] = admin._id;
    transaction['payeeId'] = product.sellerId;
    transaction['description'] = description;
    transaction['amount'] = sellerAmount;
    transaction['date'] = date;

    await TransactionsHelper.addTransaction(transaction);
    
    // ['Pending Payment', 'Pending Shipment', 'Shipped', 'Delivered']
    product.status = 'Pending Shipment';
    await product.save();
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.getUserByEmail = getUserByEmail;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.purchaseTokens = purchaseTokens;
module.exports.payForProduct = payForProduct;