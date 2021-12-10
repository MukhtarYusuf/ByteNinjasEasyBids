const Admin = require('../models/admin.model');

// Get all Admins
async function getAllAdmins() {
    const admins = await Admin.find.exec();
    return admins;
}

// Get one Admin
async function getAdmin(adminId) {
    const admin = await Admin.findById(adminId).exec();
    return admin;
}

// Add an Admin
async function addAdmin(admin) {
    const email = admin.email;
    const firstName = admin.firstName;
    const lastName = admin.lastName;

    const newAdmin = new Admin({
        email,
        firstName,
        lastName,
    });

    await newAdmin.save()
}

// Update an Admin
async function updateAdmin(adminId, admin) {
    const adminToUpdate = await Admin.findById(adminId).exec();

    adminToUpdate.email = admin.email;
    adminToUpdate.firstName = admin.firstName;
    adminToUpdate.lastName = admin.lastName;

    await adminToUpdate.save();
}

// Delete an Admin
async function deleteAdmin(adminId) {
    await Admin.findByIdAndDelete(adminId).exec();
}

module.exports.getAllAdmins = getAllAdmins;
module.exports.getAdmin = getAdmin;
module.exports.addAdmin = addAdmin;
module.exports.updateAdmin = updateAdmin;
module.exports.deleteAdmin = deleteAdmin;