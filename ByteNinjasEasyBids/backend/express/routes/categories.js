var express = require('express');
var router = express.Router();

const CategoriesHelper = require('../helpers/categoriesHelper');

/*
const categorySchema = new Schema({
    name: { type: String },
}
*/

// GET: Get all Categories
router.route('/').get(async (req, res) => {
    try {
        const categories = await CategoriesHelper.getAllCategories();
        res.json(categories);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one Category
router.route('/:id').get(async (req, res) => {
    try {
        const category = await CategoriesHelper.getCategory(req.params.id);
        res.json(category);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add a Category
router.route('/add').post(async (req, res) => {
    try {
        await CategoriesHelper.addCategory(req.body);
        res.json('Successfully Added');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update a Category
router.route('/update/:id').put(async (req, res) => {
    try {
        await CategoriesHelper.updateCategory(req.params.id, req.body);
        res.json('Successfully Updated');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete a Category
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await CategoriesHelper.deleteCategory(req.params.id);
        res.json('Successfully Deleted');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;