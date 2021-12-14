var express = require('express');
var router = express.Router();

const AdminsHelper = require('../helpers/adminsHelper');
const Admin = require('../models/admin.model');

/*
const adminSchema = new Schema({
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
}
*/

// GET: Get all Admins
router.route('/').get(async (req, res) => {
    try {
        const admins = await AdminsHelper.getAllAdmins();
        res.json(admins);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one Admin
router.route('/:id').get(async (req, res) => {
    try {
        const admin = await AdminsHelper.getAdmin(req.params.id);
        res.json(admin);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add an Admin
router.route('/add').post(async (req, res) => {
    try {
        await AdminsHelper.addAdmin(req.body);
        res.json('Successfully Added');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update an Admin
router.route('/Update/:id').put(async (req, res) => {
    try {
        await AdminsHelper.updateAdmin(req.params.id, req.body);
        res.json('Successfully Updated');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete an Admin
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await AdminsHelper.deleteAdmin(req.params.id);
        res.json('Successfully Deleted');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;