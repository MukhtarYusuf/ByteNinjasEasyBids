const Product = require('../models/product.model');

// Get all Products
async function getAllProducts() {
    const products = await Product.find().sort({ startTime: 'asc' }).exec();
    return products;
}

// Get one Product
async function getProduct(productId) {
    const product = await Product.findById(productId).exec();
    return product;
}

// Add a Product
async function addProduct(product) {
    const name = product.name;
    const description = product.description;
    const sellerId = product.sellerId;
    const startTime = product.startTime;
    const duration = product.duration;
    const timeLeft = product.duration;
    const originalPrice = product.originalPrice;
    const biddingPrice = product.biddingPrice;
    const minSellingPrice = product.minSellingPrice;
    const participants = product.participants;
    const winnerUsername = '';
    const status = product.status;

    const newProduct = new Product({ 
        name, 
        description, 
        sellerId, 
        startTime, 
        duration,
        timeLeft,
        originalPrice,
        biddingPrice, 
        minSellingPrice, 
        participants,
        winnerUsername,
        status,
    });

    await newProduct.save();
}

// Update a Product
async function updateProduct(productId, product) {
    const productToUpdate = await Product.findById(productId).exec();

    productToUpdate.name = product.name;
    productToUpdate.description = product.description;
    productToUpdate.sellerId = product.sellerId;
    productToUpdate.startTime = Number(product.startTime);
    productToUpdate.duration = Number(product.duration);
    productToUpdate.timeLeft = Number(product.timeLeft);
    productToUpdate.biddingPrice = Number(product.biddingPrice);
    productToUpdate.minSellingPrice = Number(product.minSellingPrice);
    productToUpdate.participants = product.participants;
    productToUpdate.winnerUsername = product.winnerUsername;
    productToUpdate.status = product.status;

    await productToUpdate.save();
}

// Delete a Product
async function deleteProduct(productId) {
    await Product.findByIdAndDelete(productId).exec();
}

// Bulk Save
async function bulkSaveProducts(products) {
    await Product.bulkSave(products);
}

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.bulkSaveProducts = bulkSaveProducts;