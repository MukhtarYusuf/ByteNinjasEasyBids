const User = require('../models/user.model');

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

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;