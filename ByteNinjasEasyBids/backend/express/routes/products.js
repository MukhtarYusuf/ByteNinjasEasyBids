var express = require('express');
var router = express.Router();

const ProductsHelper = require('../helpers/productsHelper');

// GET: Get all Products
router.route('/').get(async (req, res) => {
    try {
        const products = await ProductsHelper.getAllProducts();
        res.json(products);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one Product
router.route('/:id').get(async (req, res) => {
    try {
        const product = await ProductsHelper.getProduct(req.params.id);
        res.json(product);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add a Product
router.route('/add').post(async (req, res) => {
    try {
        await ProductsHelper.addProduct(req.body);
        res.json('Successfully Added');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update a Product
router.route('/update/:id').put(async (req, res) => {
    try {
        await ProductsHelper.updateProduct(req.params.id, req.body);
        res.json('Successfully Updated');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete a Product
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await ProductsHelper.deleteProduct(req.params.id);
        res.json('Successfully Deleted');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;