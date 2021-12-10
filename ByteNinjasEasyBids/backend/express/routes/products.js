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

    // Product.findById(req.params.id)
    //     .then(product => {
    //         product.name = req.body.name;
    //         product.description = req.body.description;
    //         product.sellerId = req.body.sellerId;
    //         product.startTime = Number(req.body.startTime);
    //         product.duration = Number(req.body.duration);
    //         product.biddingPrice = Number(req.body.biddingPrice);
    //         product.minSellingPrice = Number(req.body.minSellingPrice);
    //         product.participants = req.body.participants;
    //         product.winner = req.body.winner;
    //         product.shippingStatus = req.body.shippingStatus;

    //         product.save()
    //             .then(() => res.json('Successfully Updated'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //     })
    //     .catch(err => res.status(400).json('Error: ' + err));
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